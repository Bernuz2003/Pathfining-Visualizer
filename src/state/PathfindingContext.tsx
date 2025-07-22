import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { Cell, Grid, ToolMode, PathfindingStats } from '../types/grid';
import { buildEmptyGrid } from '../utils/grid';
import { reducer, initialState, Action } from './reducer';

interface Ctx {
  state: typeof initialState;
  dispatch: Dispatch<Action>;
}

const PathfindingContext = createContext<Ctx | undefined>(undefined);

export const PathfindingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PathfindingContext.Provider value={{ state, dispatch }}>
      {children}
    </PathfindingContext.Provider>
  );
};

export function usePF() {
  const ctx = useContext(PathfindingContext);
  if (!ctx) throw new Error('usePF must be used within PathfindingProvider');
  return ctx;
}