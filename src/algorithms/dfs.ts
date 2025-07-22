import { Grid, Cell } from '../types/grid';
import { getNeighbors } from '../utils/grid';
import { reconstructPath, keyOf } from './utils';

export interface Step { type: 'visit' | 'path'; cell: Cell; }

export function dfs(grid: Grid, start: Cell, end: Cell): Step[] {
  const steps: Step[] = [];
  const stack: Cell[] = [start];
  const prev = new Map<string, Cell>();
  const visited = new Set<string>();

  while (stack.length) {
    const u = stack.pop()!;
    const uk = keyOf(u);
    if (visited.has(uk)) continue;
    visited.add(uk);
    steps.push({ type: 'visit', cell: u });
    if (u === end) break;
    for (const v of getNeighbors(grid, u)) {
      const vk = keyOf(v);
      if (!visited.has(vk)) {
        prev.set(vk, u);
        stack.push(v);
      }
    }
  }
  const path = reconstructPath(prev, end);
  for (const c of path) steps.push({ type: 'path', cell: c });
  return steps;
}