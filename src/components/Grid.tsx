import React, { useState, useEffect } from 'react';
import { Cell as CellType } from '../types/grid';
import { Cell } from './Cell';

interface GridProps {
  grid: CellType[][];
  onCellClick: (row: number, col: number, isRightClick: boolean) => void;
}

export const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDrawing(false);
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleCellClick = (row: number, col: number, isRight: boolean) => {
    if (isRight) {
      setIsDrawing(true);
    }
    onCellClick(row, col, isRight);
  };

  const handleCellEnter = (row: number, col: number) => {
    if (isDrawing) {
      onCellClick(row, col, true);
    }
  };

  return (
    <div 
      className="inline-grid gap-0" 
      style={{ 
        gridTemplateColumns: `repeat(${grid[0].length}, 1.5rem)`
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            cell={cell}
            onClick={(isRight) => handleCellClick(i, j, isRight)}
            onMouseEnter={() => handleCellEnter(i, j)}
          />
        ))
      )}
    </div>
  );
};