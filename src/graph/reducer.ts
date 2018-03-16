import { getType } from 'typesafe-actions';

import { RootAction } from '../rootAction';
import { GraphActions } from './actions';


/* === State === */
export type GraphState = {
  readonly fetching1: boolean;
  readonly error1: string;
  readonly imgSrc1: string;
};

export const InitialGraphState: GraphState = {
  fetching1: false,
  error1: '',
  imgSrc1: ''
};


/* === REDUCER === */
export function GraphReducer(state: GraphState = InitialGraphState, action: RootAction) {
  switch(action.type) {
    case getType(GraphActions.request):
      return {
        ...state,
        fetching1: !state.fetching1
      }
    case getType(GraphActions.failure):
      return {
        ...state,
        error1: action.payload
      }
    case getType(GraphActions.success):
      return {
        ...state,
        imgSrc1: action.payload
      }
    default: return state;
  }
};
