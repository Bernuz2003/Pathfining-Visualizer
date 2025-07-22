import React from 'react';
import { motion } from 'framer-motion';
import { Cell as CellType } from '../types/grid';

const cellColors = {
  empty: 'bg-white',
  start: 'bg-green-500',
  end: 'bg-red-500',
  wall: 'bg-gray-800',
  visited: 'bg-blue-200',
  path: 'bg-purple-500',
  current: 'bg-yellow-300',
};

interface CellProps {
  cell: CellType;
  onClick: (isRight: boolean) => void;
  onMouseEnter: () => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick, onMouseEnter }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(e.button === 2);
  };

  return (
    <motion.div
      className={`w-6 h-6 border-[0.5px] border-gray-200 ${cellColors[cell.type]}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onMouseDown={handleMouseDown}
      onMouseEnter={onMouseEnter}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};