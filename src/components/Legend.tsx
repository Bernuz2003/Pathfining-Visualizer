import React from 'react';

const legendItems = [
  { type: 'start', label: 'Start' },
  { type: 'end', label: 'End' },
  { type: 'wall', label: 'Wall' },
  { type: 'visited', label: 'Visited' },
  { type: 'path', label: 'Path' },
];

export const Legend: React.FC = () => (
  <div className="legend">
    {legendItems.map(item => (
      <div key={item.type} className="legend-item">
        <span className={`cell ${item.type}`} />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);