import { Cell } from '../types/grid';

export function manhattan(a: Cell, b: Cell) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function reconstructPath(cameFrom: Map<string, Cell>, end: Cell): Cell[] {
  const path: Cell[] = [];
  let current: Cell | undefined = end;
  while (current) {
    path.push(current);
    const key = keyOf(current);
    current = cameFrom.get(key);
  }
  return path.reverse();
}

export function keyOf(c: Cell) {
  return `${c.row},${c.col}`;
}