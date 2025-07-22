import { Cell, Grid, GridConfig } from '../types/grid';

export function createInitialGrid({ rows, cols, wallDensity = 0.1 }: GridConfig): Grid {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      type: 'empty'
    }))
  );
}

export function randomizeWalls(grid: Grid, density: number = 0.1): Grid {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      type: cell.type === 'start' || cell.type === 'end'
        ? cell.type
        : Math.random() < density ? 'wall' : 'empty'
    }))
  );
}

export function clearGrid(grid: Grid): Grid {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      type: cell.type === 'start' || cell.type === 'end' ? cell.type : 'empty'
    }))
  );
}