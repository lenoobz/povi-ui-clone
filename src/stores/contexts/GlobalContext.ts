import { createContext, Dispatch } from 'react';
import { GlobalAction, GlobalState } from '../reducers/GlobalReducer';

export type GlobalContextType = [GlobalState, Dispatch<GlobalAction>];

export const GlobalContext = createContext<GlobalContextType>(undefined!);
