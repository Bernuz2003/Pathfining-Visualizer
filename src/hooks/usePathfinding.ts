import { useState, useRef, useCallback } from 'react';
import { Cell, Grid, Algorithm, PathfindingStats } from '../types/grid';
import * as algorithms from '../algorithms';

export function usePathfinding() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState<PathfindingStats>({
    visitedCells: 0,
    pathLength: 0,
    executionTime: 0
  });

  const startRef = useRef<Cell | null>(null);
  const endRef = useRef<Cell | null>(null);

  const startVisualization = useCallback(async (
    grid: Grid,
    algorithm: Algorithm,
    speed: number
  ) => {
    if (!startRef.current || !endRef.current) {
      alert('Please select both start and end points');
      return;
    }

    setIsRunning(true);
    const startTime = performance.now();
    let visitedCount = 0;

    const onVisit = async (cell: Cell) => {
      if (isPaused) {
        await new Promise(resolve => {
          const checkPause = () => {
            if (!isPaused) resolve(null);
            else setTimeout(checkPause, 100);
          };
          checkPause();
        });
      }
      visitedCount++;
      setStats(prev => ({ ...prev, visitedCells: visitedCount }));
      await new Promise(resolve => setTimeout(resolve, 101 - speed));
    };

    const path = await algorithms[algorithm](
      grid,
      startRef.current,
      endRef.current,
      onVisit
    );

    setStats(prev => ({
      ...prev,
      pathLength: path.length,
      executionTime: Math.round(performance.now() - startTime)
    }));
    setIsRunning(false);
  }, [isPaused]);

  return {
    isRunning,
    isPaused,
    stats,
    startRef,
    endRef,
    setIsRunning,
    setIsPaused,
    startVisualization
  };
}