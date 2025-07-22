export type CellType = 'empty' | 'wall' | 'start' | 'end';
export interface Cell {
  row: number;
  col: number;
  type: CellType;
  visited?: boolean;
  path?: boolean;
  weight?: number;
}
export type Grid = Cell[][];

export type Algorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs' | 'greedy';

export interface PathfindingStats {
  visitedCells: number;
  pathLength: number;
  executionTime: number; // ms
}

export type ToolMode = 'start' | 'end' | 'wall' | 'erase';
