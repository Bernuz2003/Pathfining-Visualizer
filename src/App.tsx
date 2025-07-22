import React from 'react';
import { PathfindingProvider } from './state/PathfindingContext.tsx';
import { Grid } from './components/Grid.tsx';
import { Controls } from './components/Controls.tsx';
import { Legend } from './components/Legend.tsx';
import './index.css';

const App: React.FC = () => {
  return (
    <PathfindingProvider>
      <div className="app">
        <h1>Pathfinding Visualizer</h1>
        <Controls />
        <div className="grid-container">
          <Grid />
        </div>
      </div>
    </PathfindingProvider>
  );
};

export default App;