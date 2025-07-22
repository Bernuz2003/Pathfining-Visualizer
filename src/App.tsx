import React, { useState, useCallback } from 'react';
import { Grid as GridComponent } from './components/Grid';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Legend } from './components/Legend';
import { Grid, Algorithm, GridConfig } from './types/grid';
import { createInitialGrid, randomizeWalls, clearGrid } from './utils/grid';
import { usePathfinding } from './hooks/usePathfinding';

export default function App() {
  const [gridSize, setGridSize] = useState<GridConfig>({
    rows: 20,
    cols: 20,
    wallDensity: 0.1
  });
  const [grid, setGrid] = useState<Grid>(() => createInitialGrid(gridSize));
  const [algorithm, setAlgorithm] = useState<Algorithm>('bfs');
  const [speed, setSpeed] = useState(50);

  const {
    isRunning,
    isPaused,
    stats,
    startRef,
    endRef,
    setIsPaused,
    startVisualization
  } = usePathfinding();

  const handleGridSizeChange = useCallback(({ rows, cols }: { rows: number; cols: number }) => {
    setGridSize({ rows, cols });
    setGrid(createInitialGrid(gridSize));
  }, []);

  
const handleCellClick = useCallback((row: number, col: number, isRightClick: boolean) => {

    console.log('handleCellClick called with:', { row, col, isRightClick }); // <--- debug
    // Se stiamo eseguendo un algoritmo, ignoriamo i click
    if (isRunning) return;

    setGrid((prevGrid) => {
      // Copia profonda della griglia
      const newGrid = prevGrid.map((r) => r.map((c) => ({ ...c })));
      const cell = newGrid[row][col];

      if (isRightClick) {
        // Se tasto destro => toggliamo muro se non è start/end
        if (cell.type !== 'start' && cell.type !== 'end') {
          cell.type = cell.type === 'wall' ? 'empty' : 'wall';
        }
      } 
      else {
        // SE NON È tasto destro (isRightClick === false)
        if (!startRef.current && cell.type !== 'wall' && cell.type !== 'end') {
          // Se non c'è ancora la partenza e la cella non è muro o end...
          if (cell.type === 'start') {
            startRef.current = null;
            cell.type = 'empty';
          } else {
            cell.type = 'start';
            startRef.current = cell;
          }
        } else if (!endRef.current && cell.type !== 'wall' && cell.type !== 'start') {
          // Se non c'è ancora l'arrivo e la cella non è muro o start...
          if (cell.type === 'end') {
            endRef.current = null;
            cell.type = 'empty';
          } else {
            cell.type = 'end';
            endRef.current = cell;
          }
        }
      }
      return newGrid;
    });
  },
  [isRunning, startRef, endRef]
);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Pathfinding Visualizer
        </h1>
        
        <div className="space-y-4">
          <Controls
            algorithm={algorithm}
            isRunning={isRunning}
            isPaused={isPaused}
            speed={speed}
            gridSize={gridSize}
            onAlgorithmChange={setAlgorithm}
            onSpeedChange={setSpeed}
            onGridSizeChange={handleGridSizeChange}
            onStart={() => startVisualization(grid, algorithm, speed)}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
            onStop={() => {
              setGrid(clearGrid(grid));
              startRef.current = null;
              endRef.current = null;
            }}
            onClear={() => setGrid(clearGrid(grid))}
            onRandomize={() => setGrid(randomizeWalls(grid))}
          />

          <div className="flex gap-4">
            <Stats stats={stats} />
            <Legend />
          </div>

          <div className="flex justify-center p-4 bg-white rounded-lg shadow-md overflow-auto">
            <GridComponent
              grid={grid}
              onCellClick={handleCellClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}