import { Grid, Cell } from '../types/grid';
import { getNeighbors } from '../utils/grid';
import { manhattan, reconstructPath, keyOf } from './utils';

export interface Step {
  type: 'visit' | 'path';
  cell: Cell;
}

export function astar(grid: Grid, start: Cell, end: Cell): Step[] {
  const steps: Step[] = [];
  const open = new Set<string>();
  const closed = new Set<string>();

  const g = new Map<string, number>();
  const f = new Map<string, number>();
  const cameFrom = new Map<string, Cell>();

  const startKey = keyOf(start);
  const endKey = keyOf(end);

  g.set(startKey, 0);
  f.set(startKey, manhattan(start, end));
  open.add(startKey);

  const getLowestF = () => {
    let best: string | null = null;
    let bestVal = Infinity;
    for (const k of open) {
      const val = f.get(k) ?? Infinity;
      if (val < bestVal) {
        bestVal = val;
        best = k;
      }
    }
    return best!;
  };

  const keyToCell = (key: string): Cell => {
    const [r, c] = key.split(',').map(Number);
    return grid[r][c];
  };

  while (open.size) {
    const currentKey = getLowestF();
    open.delete(currentKey);
    closed.add(currentKey);

    const current = keyToCell(currentKey);
    steps.push({ type: 'visit', cell: current });

    if (currentKey === endKey) {
      const path = reconstructPath(cameFrom, current);
      for (const cell of path) steps.push({ type: 'path', cell });
      return steps;
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const nk = keyOf(neighbor);
      if (closed.has(nk)) continue;

      const tentativeG = (g.get(currentKey) ?? Infinity) + 1;
      if (!open.has(nk)) open.add(nk);
      else if (tentativeG >= (g.get(nk) ?? Infinity)) continue;

      cameFrom.set(nk, current);
      g.set(nk, tentativeG);
      f.set(nk, tentativeG + manhattan(neighbor, end));
    }
  }

  return steps; // nessun path
}