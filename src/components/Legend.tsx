import React from 'react';

export const Legend: React.FC = () => {
  const items = [
    { color: 'bg-green-500', label: 'Start' },
    { color: 'bg-red-500', label: 'End' },
    { color: 'bg-gray-800', label: 'Wall' },
    { color: 'bg-yellow-300', label: 'Current' },
    { color: 'bg-blue-200', label: 'Visited' },
    { color: 'bg-purple-500', label: 'Path' },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-md">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-4 h-4 ${color} rounded-sm`} />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );
};