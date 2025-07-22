import { Cell, Grid } from '../types/grid';
import { getNeighbors, reconstructPath } from './utils';

function manhattan(a: Cell, b: Cell): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export async function greedy(
  grid: Grid,
  start: Cell,
  end: Cell,
  onVisit: (cell: Cell) => Promise<void>
): Promise<Cell[]> {
  const openSet = new Set<string>([`${start.row}-${start.col}`]);
  const closedSet = new Set<string>();
  
  start.h = manhattan(start, end);

  while (openSet.size > 0) {
    // Find node with lowest heuristic value
    let current: Cell | null = null;
    let lowestH = Infinity;
    
    for (const key of openSet) {
      const [row, col] = key.split('-').map(Number);
      const cell = grid[row][col];
      if (cell.h! < lowestH) {
        lowestH = cell.h!;
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

      if (!openSet.has(neighborKey)) {
        neighbor.parent = current;
        neighbor.h = manhattan(neighbor, end);
        openSet.add(neighborKey);
      }
    }
  }

  return [];
}