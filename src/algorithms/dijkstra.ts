import { Grid, Cell } from '../types/grid';
import { getNeighbors } from '../utils/grid';
import { reconstructPath, keyOf } from './utils';

export interface Step {
  type: 'visit' | 'path';
  cell: Cell;
}

export function dijkstra(grid: Grid, start: Cell, end: Cell): Step[] {
  const steps: Step[] = [];
  const dist = new Map<string, number>();
  const prev = new Map<string, Cell>();
  const visited = new Set<string>();

  const pq: [Cell, number][] = [];
  const push = (cell: Cell, d: number) => {
    pq.push([cell, d]);
    pq.sort((a, b) => a[1] - b[1]);
  };

  for (const row of grid) {
    for (const cell of row) {
      dist.set(keyOf(cell), Infinity);
    }
  }

  dist.set(keyOf(start), 0);
  push(start, 0);

  while (pq.length) {
    const [u] = pq.shift()!;
    const k = keyOf(u);
    if (visited.has(k)) continue;
    visited.add(k);
    steps.push({ type: 'visit', cell: u });
    if (u === end) break;

    for (const v of getNeighbors(grid, u)) {
      const vk = keyOf(v);
      const alt = (dist.get(k) ?? Infinity) + 1; // peso unitario
      if (alt < (dist.get(vk) ?? Infinity)) {
        dist.set(vk, alt);
        prev.set(vk, u);
        push(v, alt);
      }
    }
  }

  const path = reconstructPath(prev, end);
  for (const cell of path) steps.push({ type: 'path', cell });
  return steps;
}