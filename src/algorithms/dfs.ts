import { Cell, Grid } from '../types/grid';
import { getNeighbors, reconstructPath } from './utils';

export async function dfs(
  grid: Grid,
  start: Cell,
  end: Cell,
  onVisit: (cell: Cell) => Promise<void>
): Promise<Cell[]> {
  const stack: Cell[] = [start];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = `${current.row}-${current.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    await onVisit(current);

    if (current.row === end.row && current.col === end.col) {
      return reconstructPath(current);
    }

    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
        neighbor.parent = current;
        stack.push(neighbor);
      }
    }
  }

  return [];
}