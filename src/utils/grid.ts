import { Cell, Grid } from '../types/grid';

export function buildEmptyGrid(rows: number, cols: number): Grid {
  const grid: Grid = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({ row: r, col: c, type: 'empty' });
    }
    grid.push(row);
  }
  return grid;
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

export function getNeighbors(grid: Grid, cell: Cell) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  const res: Cell[] = [];
  for (const [dr, dc] of dirs) {
    const r = cell.row + dr;
    const c = cell.col + dc;
    if (grid[r]?.[c] && grid[r][c].type !== 'wall') res.push(grid[r][c]);
  }
  return res;
}