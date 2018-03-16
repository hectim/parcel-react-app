import { getType } from 'typesafe-actions';

import { RootAction } from '../rootAction';
import { GraphActions } from './actions';


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
    case getType(GraphActions.request):
      return {
        ...state,
        fetching: !state.fetching
      }
    case getType(GraphActions.failure):
      return {
        ...state,
        error: action.payload
      }
    case getType(GraphActions.success):
      return {
        ...state,
        imgSrc: action.payload
      }
    default: return state;
  }
};
