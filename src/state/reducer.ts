import { Cell, Grid, ToolMode, PathfindingStats } from '../types/grid';
import { buildEmptyGrid, cloneGrid } from '../utils/grid';

export type Action =
  | { type: 'SET_TOOL'; tool: ToolMode }
  | { type: 'SET_GRID_SIZE'; rows: number; cols: number }
  | { type: 'SET_START'; row: number; col: number }
  | { type: 'SET_END'; row: number; col: number }
  | { type: 'TOGGLE_WALL'; row: number; col: number }
  | { type: 'CLEAR_CELL'; row: number; col: number }
  | { type: 'RESET_GRID' }
  | { type: 'SET_RUNNING'; running: boolean }
  | { type: 'SET_STATS'; stats: PathfindingStats }
  | { type: 'SET_VISUAL'; row: number; col: number; visited?: boolean; path?: boolean }
  | { type: 'CLEAR_VISUAL' };

export interface State {
  grid: Grid;
  rows: number;
  cols: number;
  tool: ToolMode;
  isRunning: boolean;
  stats: PathfindingStats;
  start: { row: number; col: number } | null;
  end: { row: number; col: number } | null;
}

export const initialState: State = {
  rows: 20,
  cols: 40,
  grid: buildEmptyGrid(20, 40),
  tool: 'wall',
  isRunning: false,
  stats: { visitedCells: 0, pathLength: 0, executionTime: 0 },
  start: null,
  end: null
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TOOL':
      return { ...state, tool: action.tool };
    case 'SET_GRID_SIZE': {
      const rows = Math.max(5, Math.min(action.rows, 25));
      const cols = rows * 2;
      const grid = buildEmptyGrid(rows, cols);
      return { ...state, rows, cols, grid, start: null, end: null };
    }
    case 'SET_START': {
      const grid = cloneGrid(state.grid);
      if (state.start) grid[state.start.row][state.start.col].type = 'empty';
      grid[action.row][action.col].type = 'start';
      return { ...state, grid, start: { row: action.row, col: action.col } };
    }
    case 'SET_END': {
      const grid = cloneGrid(state.grid);
      if (state.end) grid[state.end.row][state.end.col].type = 'empty';
      grid[action.row][action.col].type = 'end';
      return { ...state, grid, end: { row: action.row, col: action.col } };
    }
    case 'TOGGLE_WALL': {
      const grid = cloneGrid(state.grid);
      const cell = grid[action.row][action.col];
      // Only place a wall if the cell is empty
      if (cell.type === 'empty') {
        cell.type = 'wall';
      }
      return { ...state, grid };
    }
    case 'CLEAR_CELL': {
      const grid = cloneGrid(state.grid);
      grid[action.row][action.col].type = 'empty';
      return { ...state, grid };
    }
    case 'RESET_GRID':
      return { ...initialState, rows: state.rows, cols: state.cols, grid: buildEmptyGrid(state.rows, state.cols) };
    case 'SET_RUNNING':
      return { ...state, isRunning: action.running };
    case 'SET_STATS':
      return { ...state, stats: action.stats };
    case 'SET_VISUAL': {
      const grid = cloneGrid(state.grid);
      const cell = grid[action.row][action.col];
      if (action.visited) cell.visited = true;
      if (action.path) cell.path = true;
      return { ...state, grid };
    }
    case 'CLEAR_VISUAL': {
      const grid = state.grid.map(row => row.map(c => ({ ...c, visited: false, path: false })));
      return { ...state, grid };
    }
    default:
      return state;
  }
}