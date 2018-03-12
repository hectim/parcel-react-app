/* === ACTIONS === */

import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ApiAction, apiCallRequest, apiCallSuccess, apiCallFailure } from './actions';


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
      case getType(toggleFetching):
        return !state 
      default: return state;
    }
  },
  error: (state = null, action) => {
    switch (action.type) {
      case getType(apiFailure):
        return [...state, action.payload];
      default: return state;
    }
  },
  dog: (state = null, action) => {
    switch (action.type) {
      case getType(setDog):
        return [...state, action.payload];
      default: return state;
    }
  },
});
