import React from 'react';
import { usePF } from '../state/PathfindingContext.tsx';
import { usePathfinding } from '../hooks/usePathfinding.ts';
import { Algorithm, ToolMode } from '../types/grid.ts';
import { Legend } from './Legend.tsx';

const algorithms: Algorithm[] = ['astar', 'dijkstra', 'bfs', 'dfs', 'greedy'];
const tools: { mode: ToolMode; label: string }[] = [
  { mode: 'start', label: 'Start' },
  { mode: 'end', label: 'End' },
  { mode: 'wall', label: 'Wall' },
  { mode: 'erase', label: 'Eraser' }
];

export const Controls: React.FC = () => {
  const { state, dispatch } = usePF();
  const { run, isRunning, stats } = usePathfinding();

  const handleRunAll = () => {
    // Questa è una funzione di esempio, puoi implementarla se vuoi
    console.log("Running all algorithms...");
  };

  return (
    <div className="controls-container">
      <div className="controls-row">
        <div className="control-group">
          <label>Tools:</label>
          {tools.map(t => (
            <button
              key={t.mode}
              disabled={isRunning}
              className={state.tool === t.mode ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_TOOL', tool: t.mode })}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="control-group">
          <label>Grid Size:</label>
          <input
            type="number" min={5} max={25} value={state.rows} disabled={isRunning}
            onChange={e => {
              const newRows = Math.min(Number(e.target.value), 25);
              dispatch({ type: 'SET_GRID_SIZE', rows: newRows, cols: newRows * 2 })
            }}
          />
          <span>{state.rows}x{state.cols}</span>
        </div>
        <div className="stats">
          <p>Visited: <span>{stats.visitedCells}</span></p>
          <p>Path: <span>{stats.pathLength}</span></p>
          <p>Time: <span>{stats.executionTime.toFixed(1)}ms</span></p>
        </div>
      </div>
      <div className="controls-row">
        <div className="control-group">
          <label>Algorithms:</label>
          {algorithms.map(a => (
            <button key={a} disabled={isRunning} onClick={() => run(a)}>{a.toUpperCase()}</button>
          ))}
        </div>
        <Legend />
        <div className="control-group" style={{ marginLeft: 'auto' }}>
           <button onClick={() => dispatch({ type: 'RESET_GRID' })} disabled={isRunning} className="action-button secondary">
            Reset Grid
          </button>
        </div>
      </div>
    </div>
  );
};