import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { RootAction } from '../rootAction';
import * as GraphActions from './actions';


/* === State === */
export type GraphState = {
  readonly fetching: boolean;
  readonly error: string;
  readonly imgSrc: string;
};

export const InitialGraphState: GraphState = {
  fetching: false,
  error: '',
  imgSrc: ''
};


/* === REDUCER === */
export const GraphReducer = combineReducers<RootAction>({
  fetching: (state = false, action) => {
    switch(action.type) {
      case getType(GraphActions.graphRequest):
        return true;
      case getType(GraphActions.graphSuccess):
      case getType(GraphActions.graphFailure):
        return false;
      default: return state;
    }
  },
  error: (state = null, action) => {
    switch(action.type) {
      case getType(GraphActions.graphFailure):
        return action.payload;
      default: return state;
    }
  },
  imgSrc: (state = null, action) => {
    switch(action.type) {
      case getType(GraphActions.graphSuccess):
        return action.payload;
      default: return state;
    }
  }
})
