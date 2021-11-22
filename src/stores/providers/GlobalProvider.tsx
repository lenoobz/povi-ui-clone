import React, { Reducer, useReducer } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { GlobalAction, GlobalState } from '../reducers/GlobalReducer';

type GlobalProviderProps = {
  initState?: GlobalState;
  reducer: Reducer<GlobalState, GlobalAction>;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({
  reducer,
  children,
  initState = {
    isFetching: false,
    hasError: false
  }
}) => {
  const value = useReducer(reducer, initState);
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
