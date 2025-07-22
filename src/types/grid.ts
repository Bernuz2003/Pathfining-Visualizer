export type CellType = 'empty' | 'start' | 'end' | 'wall' | 'visited' | 'path' | 'current';

export interface Cell {
  row: number;
  col: number;
  type: CellType;
  f?: number; // f = g + h (for A*)
  g?: number; // Cost from start to current node
  h?: number; // Heuristic (estimated cost from current to end)
  parent?: Cell; // For path reconstruction
}

export type Grid = Cell[][];

export type Algorithm = 'bfs' | 'dfs' | 'dijkstra' | 'astar' | 'greedy';

export interface PathfindingStats {
  visitedCells: number;
  pathLength: number;
  executionTime: number;
}

export interface GridConfig {
  rows: number;
  cols: number;
  wallDensity?: number;
}