import { Cell, Grid } from '../types/grid';

export function getNeighbors(grid: Grid, cell: Cell): Cell[] {
  const neighbors: Cell[] = [];
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  for (const [dx, dy] of directions) {
    const newRow = cell.row + dx;
    const newCol = cell.col + dy;

    if (
      newRow >= 0 && newRow < grid.length &&
      newCol >= 0 && newCol < grid[0].length &&
      grid[newRow][newCol].type !== 'wall'
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}

export function reconstructPath(end: Cell): Cell[] {
  const path: Cell[] = [];
  let current: Cell | undefined = end;

  while (current) {
    path.unshift(current);
    current = current.parent;
  }

  return path;
}