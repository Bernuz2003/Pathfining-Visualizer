import { Cell, Grid } from '../types/grid';
import { getNeighbors, reconstructPath } from './utils';

export async function dijkstra(
  grid: Grid,
  start: Cell,
  end: Cell,
  onVisit: (cell: Cell) => Promise<void>
): Promise<Cell[]> {
  const distances = new Map<string, number>();
  const unvisited = new Set<string>();
  
  // Initialize distances
  for (const row of grid) {
    for (const cell of row) {
      const key = `${cell.row}-${cell.col}`;
      distances.set(key, Infinity);
      unvisited.add(key);
    }
  }
  
  distances.set(`${start.row}-${start.col}`, 0);
  start.g = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let minDistance = Infinity;
    let current: Cell | null = null;
    
    for (const key of unvisited) {
      const distance = distances.get(key)!;
      if (distance < minDistance) {
        minDistance = distance;
        const [row, col] = key.split('-').map(Number);
        current = grid[row][col];
      }
    }

    if (!current || minDistance === Infinity) break;
    
    const currentKey = `${current.row}-${current.col}`;
    unvisited.delete(currentKey);
    
    if (current.type !== 'start' && current.type !== 'end') {
      await onVisit(current);
    }

    if (current === end) {
      return reconstructPath(current);
    }

    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (!unvisited.has(`${neighbor.row}-${neighbor.col}`)) continue;
      
      const distance = distances.get(currentKey)! + 1;
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      
      if (distance < distances.get(neighborKey)!) {
        distances.set(neighborKey, distance);
        neighbor.g = distance;
        neighbor.parent = current;
      }
    }
  }

  return [];
}