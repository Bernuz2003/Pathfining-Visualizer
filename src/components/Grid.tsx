import React, { useState, useEffect } from 'react';
import { Cell } from './Cell';
import { usePF } from '../state/PathfindingContext';

export const Grid: React.FC = () => {
  const { state, dispatch } = usePF();
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const up = () => setIsDown(false);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  const handleDown = (row: number, col: number, button: number) => {
    setIsDown(true);
    applyTool(row, col);
  };

  const handleEnter = (row: number, col: number, dragging: boolean) => {
    if (!dragging || !isDown) return;
    applyTool(row, col, true);
  };

  const applyTool = (row: number, col: number, dragging = false) => {
    const tool = state.tool;
    switch (tool) {
      case 'start':
        dispatch({ type: 'SET_START', row, col });
        break;
      case 'end':
        dispatch({ type: 'SET_END', row, col });
        break;
      case 'wall':
        dispatch({ type: 'TOGGLE_WALL', row, col });
        break;
      case 'erase':
        dispatch({ type: 'CLEAR_CELL', row, col });
        break;
    }
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${state.cols}, 1fr)` }}>
      {state.grid.map(row =>
        row.map(cell => (
          <Cell key={`${cell.row}-${cell.col}`} cell={cell} onMouseDown={handleDown} onMouseEnter={handleEnter} />
        ))
      )}
    </div>
  );
};