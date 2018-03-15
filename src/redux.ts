/* === ACTIONS === */

import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ApiAction, generalActions } from './actions';


/* === State === */
export type ApiState = {
  readonly fetching: boolean;
  readonly error: string;
  readonly dog: string;
};

export type RootState = {
  api: ApiState;
};

/* === REDUCER === */
export const ApiReducer = combineReducers<RootState>({
  fetching: (state = false, action) => {
    switch (action.type) {
      case getType(generalActions.request):
        return !state
      default: return state;
    }
  },
  error: (state = "", action) => {
    switch (action.type) {
      case getType(generalActions.failure):
        return action.payload;
      default: return state;
    }
  },
  dog: (state = "", action) => {
    switch (action.type) {
      case getType(generalActions.success):
        return action.payload;
      default: return state;
    }
  },
});
