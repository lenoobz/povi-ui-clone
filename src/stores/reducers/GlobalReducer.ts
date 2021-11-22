import { Actions } from 'consts/action.enum';
import { Reducer } from 'react';
import { AlertInfo, EnabledAccounts, UserDetails, Accounts } from 'types';

export type GlobalState = {
  hasError: boolean;
  isFetching: boolean;
  jwtToken?: string;
  accounts?: Accounts;
  enabledAccounts?: EnabledAccounts;
  pageAlert?: AlertInfo;
  userDetails?: UserDetails;
};

export type GlobalAction = {
  type: Actions;
  payload?: any;
};

export const globalReducer: Reducer<GlobalState, GlobalAction> = (state, action) => {
  switch (action.type) {
    case Actions.START_FETCHING:
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case Actions.ERROR_FETCHING:
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case Actions.FINISH_FETCHING:
      return {
        ...state,
        hasError: false,
        isFetching: false
      };
    case Actions.INIT_REQUEST_SUCCESS:
      return {
        ...state,
        jwtToken: action.payload.jwtToken,
        accounts: action.payload.accounts,
        userDetails: action.payload.userDetails,
        enabledAccounts: Object.assign({}, state.enabledAccounts, action.payload.enabledAccounts)
      };
    case Actions.CREATE_ACCOUNT_REQUEST_SUCCESS:
      return {
        ...state,
        accounts: action.payload.accounts,
        enabledAccounts: Object.assign({}, state.enabledAccounts, action.payload.enabledAccounts)
      };
    case Actions.EDIT_ACCOUNT_REQUEST_SUCCESS:
      return {
        ...state,
        accounts: action.payload.accounts
      };
    case Actions.DELETE_ACCOUNT_REQUEST_SUCCESS:
      return {
        ...state,
        accounts: action.payload.accounts,
        enabledAccounts: Object.assign({}, action.payload.enabledAccounts)
      };
    case Actions.UPDATE_ENABLED_ACCOUNTS_REQUEST_SUCCESS:
      return {
        ...state,
        enabledAccounts: Object.assign({}, state.enabledAccounts, action.payload.enabledAccounts)
      };
    case Actions.ADD_PAGE_ALERT:
      return {
        ...state,
        pageAlert: Object.assign({}, state.pageAlert, action.payload.pageAlert)
      };
    case Actions.REMOVE_PAGE_ALERT:
      return {
        ...state,
        pageAlert: undefined
      };
    default:
      return state;
  }
};
