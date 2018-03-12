/* === ACTIONS === */

import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ApiAction, generalActions } from './actions';


/* === State === */
export type ApiState = {
  readonly fetching: boolean;
  readonly error: string | null;
  readonly dog: string | null;
};

export type RootState = {
  api: ApiState;
};

/* === REDUCER === */
export const ApiReducer = combineReducers<ApiState, ApiAction>({
  fetching: (state = false, action) => {
    switch (action.type) {
      case getType(generalActions.request):
        return !state
      default: return state;
    }
  },
  error: (state = null, action) => {
    switch (action.type) {
      case getType(generalActions.failure):
        return [...state, action.payload];
      default: return state;
    }
  },
  dog: (state = null, action) => {
    switch (action.type) {
      case getType(generalActions.success):
        return [...state, action.payload];
      default: return state;
    }
  },
});
