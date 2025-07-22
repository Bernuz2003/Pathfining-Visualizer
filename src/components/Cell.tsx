import React, { memo } from 'react';
import { Cell as CellType } from '../types/grid';

interface Props {
  cell: CellType;
  onMouseDown: (row: number, col: number, button: number) => void;
  onMouseEnter: (row: number, col: number, isDown: boolean) => void;
}

export const Cell: React.FC<Props> = memo(({ cell, onMouseDown, onMouseEnter }) => {
  const className = [
    'cell',
    cell.type,
    cell.visited ? 'visited' : '',
    cell.path ? 'path' : ''
  ].join(' ');

  return (
    <div
      className={className}
      onMouseDown={e => onMouseDown(cell.row, cell.col, e.button)}
      onMouseEnter={e => onMouseEnter(cell.row, cell.col, e.buttons === 1)}
    />
  );
});