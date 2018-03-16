import { getType } from 'typesafe-actions';

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
export function GraphReducer(state: GraphState = InitialGraphState, action: RootAction) {
  switch(action.type) {
    case getType(GraphActions.graphRequest):
      return {
        ...state,
        fetching: !state.fetching
      }
    case getType(GraphActions.graphFailure):
      return {
        ...state,
        error: action.payload
      }
    case getType(GraphActions.graphSuccess):
      return {
        ...state,
        imgSrc: action.payload
      }
    default: return state;
  }
};
