import React from 'react';
import { PathfindingStats } from '../types/grid';

interface StatsProps {
  stats: PathfindingStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="flex gap-6 p-4 bg-white rounded-lg shadow-md">
      <div>
        <span className="text-sm text-gray-600">Visited Cells:</span>
        <span className="ml-2 font-semibold">{stats.visitedCells}</span>
      </div>
      <div>
        <span className="text-sm text-gray-600">Path Length:</span>
        <span className="ml-2 font-semibold">{stats.pathLength}</span>
      </div>
      <div>
        <span className="text-sm text-gray-600">Execution Time:</span>
        <span className="ml-2 font-semibold">{stats.executionTime}ms</span>
      </div>
    </div>
  );
};