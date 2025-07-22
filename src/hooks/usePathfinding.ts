import { useCallback } from 'react';
import { usePF } from '../state/PathfindingContext.tsx';
import { Algorithm, Cell } from '../types/grid';
import * as algos from '../algorithms';

export function usePathfinding() {
  const { state, dispatch } = usePF();

  const run = useCallback((algorithm: Algorithm) => {
    if (!state.start || !state.end) return;
    dispatch({ type: 'CLEAR_VISUAL' });
    dispatch({ type: 'SET_RUNNING', running: true });
    const startTime = performance.now();

    const steps = algos[algorithm](state.grid, state.grid[state.start.row][state.start.col], state.grid[state.end.row][state.end.col]);

    let visited = 0;
    let pathLen = 0;

    let i = 0;
    const tick = () => {
      const batch = 8; // velocità animazione
      for (let j = 0; j < batch && i < steps.length; j++, i++) {
        const s = steps[i];
        if (s.type === 'visit') {
          visited++;
          dispatch({ type: 'SET_VISUAL', row: s.cell.row, col: s.cell.col, visited: true });
        } else {
          pathLen++;
          dispatch({ type: 'SET_VISUAL', row: s.cell.row, col: s.cell.col, path: true });
        }
      }
      if (i < steps.length) requestAnimationFrame(tick);
      else {
        const exec = performance.now() - startTime;
        dispatch({ type: 'SET_STATS', stats: { visitedCells: visited, pathLength: pathLen, executionTime: exec } });
        dispatch({ type: 'SET_RUNNING', running: false });
      }
    };
    requestAnimationFrame(tick);
  }, [state.grid, state.start, state.end, dispatch]);

  return { run, isRunning: state.isRunning, stats: state.stats };
}