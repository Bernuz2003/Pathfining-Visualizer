import { Grid, Cell } from '../types/grid';
import { getNeighbors } from '../utils/grid';
import { manhattan, reconstructPath, keyOf } from './utils';

export interface Step { type: 'visit' | 'path'; cell: Cell; }

export function greedy(grid: Grid, start: Cell, end: Cell): Step[] {
  const steps: Step[] = [];
  const open: Cell[] = [start];
  const cameFrom = new Map<string, Cell>();
  const visited = new Set<string>();

  while (open.length) {
    open.sort((a, b) => manhattan(a, end) - manhattan(b, end));
    const current = open.shift()!;
    const ck = keyOf(current);
    if (visited.has(ck)) continue;
    visited.add(ck);
    steps.push({ type: 'visit', cell: current });
    if (current === end) {
      const path = reconstructPath(cameFrom, current);
      for (const p of path) steps.push({ type: 'path', cell: p });
      return steps;
    }
    for (const n of getNeighbors(grid, current)) {
      const nk = keyOf(n);
      if (!visited.has(nk)) {
        cameFrom.set(nk, current);
        open.push(n);
      }
    }
  }
  return steps;
}