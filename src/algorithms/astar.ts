import { Cell, Grid } from '../types/grid';
import { getNeighbors, reconstructPath } from './utils';

function manhattan(a: Cell, b: Cell): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export async function astar(
  grid: Grid,
  start: Cell,
  end: Cell,
  onVisit: (cell: Cell) => Promise<void>
): Promise<Cell[]> {
  const openSet = new Set<string>([`${start.row}-${start.col}`]);
  const closedSet = new Set<string>();
  
  start.g = 0;
  start.h = manhattan(start, end);
  start.f = start.h;

  while (openSet.size > 0) {
    // Find node with lowest f score
    let current: Cell | null = null;
    let lowestF = Infinity;
    
    for (const key of openSet) {
      const [row, col] = key.split('-').map(Number);
      const cell = grid[row][col];
      if (cell.f! < lowestF) {
        lowestF = cell.f!;
        current = cell;
      }
    }

    if (!current) break;
    
    const currentKey = `${current.row}-${current.col}`;
    openSet.delete(currentKey);
    closedSet.add(currentKey);

    if (current.type !== 'start' && current.type !== 'end') {
      await onVisit(current);
    }

    if (current === end) {
      return reconstructPath(current);
    }

    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (closedSet.has(neighborKey)) continue;

      const tentativeG = current.g! + 1;

      if (!openSet.has(neighborKey)) {
        openSet.add(neighborKey);
      } else if (tentativeG >= neighbor.g!) {
        continue;
      }

      neighbor.parent = current;
      neighbor.g = tentativeG;
      neighbor.h = manhattan(neighbor, end);
      neighbor.f = neighbor.g + neighbor.h;
    }
  }

  return [];
}