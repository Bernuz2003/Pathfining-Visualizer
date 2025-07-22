import React from 'react';
import { Algorithm } from '../types/grid';
import { Pause, Play, RefreshCw, Square, Trash2 } from 'lucide-react';

interface ControlsProps {
  algorithm: Algorithm;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  gridSize: { rows: number; cols: number };
  onAlgorithmChange: (algo: Algorithm) => void;
  onSpeedChange: (speed: number) => void;
  onGridSizeChange: (size: { rows: number; cols: number }) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onClear: () => void;
  onRandomize: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  algorithm,
  isRunning,
  isPaused,
  speed,
  gridSize,
  onAlgorithmChange,
  onSpeedChange,
  onGridSizeChange,
  onStart,
  onPause,
  onResume,
  onStop,
  onClear,
  onRandomize,
}) => {
  const handleSizeChange = (value: string) => {
    const size = Math.max(5, Math.min(50, Number(value)));
    onGridSizeChange({ rows: size, cols: size });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <select
          className="px-3 py-2 border rounded-md"
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
          disabled={isRunning}
        >
          <option value="bfs">Breadth First Search</option>
          <option value="dfs">Depth First Search</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="astar">A* Search</option>
          <option value="greedy">Greedy Best-First Search</option>
        </select>

        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              <Play size={20} />
            </button>
          ) : (
            <>
              {!isPaused ? (
                <button
                  onClick={onPause}
                  className="p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  <Pause size={20} />
                </button>
              ) : (
                <button
                  onClick={onResume}
                  className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  <Play size={20} />
                </button>
              )}
              <button
                onClick={onStop}
                className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                <Square size={20} />
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClear}
          className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={isRunning}
        >
          <Trash2 size={20} />
        </button>

        <button
          onClick={onRandomize}
          className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={isRunning}
        >
          <RefreshCw size={20} />
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Grid Size:</label>
          <input
            type="number"
            min="5"
            max="50"
            value={gridSize.rows}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="w-20 px-2 py-1 border rounded-md"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Speed:</span>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-32"
        />
      </div>
    </div>
  );
};