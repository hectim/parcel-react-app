import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { RootAction } from '../rootAction';
import * as GraphActions from './actions';



// TODO
// object
// map
// array

export interface Node { id: number; type: string };

/* === State === */
export interface GraphState {
  nodes: {
    isLoading: boolean;
    nodes: Array<Node>;
    errorMsg: string;
  }
  readonly fetching: boolean;
  readonly error: string;
  readonly imgSrc: string;
};

// TODO stop using initial state here. it is being repeated by the reducer.
export const InitialGraphState: GraphState = {
  nodes: {
    isLoading: false,
    nodes: [],
    errorMsg: '',
  },
  fetching: false,
  error: '',
  imgSrc: ''
};

/* === REDUCER === */
export function GraphReducer(state: GraphState = InitialGraphState, action: RootAction) {
  switch(action.type) {
    case getType(GraphActions.requestAddNode):
      return {
        ...state,
        nodes: {
          ...state.nodes,
          isLoading: true
        }
      }
    case getType(GraphActions.cancelAddNode):
      return {
        ...state,
        nodes: {
          ...state.nodes,
          isLoading: false
        }
      }
    case getType(GraphActions.successAddNode):
      return {
        ...state,
        nodes: {
          ...state.nodes,
          isLoading: false,
          nodes: state.nodes.nodes.concat(action.payload)
        }
      }
    case getType(GraphActions.failureAddNode):
      return {
        ...state,
        nodes: {
          ...state.nodes,
          isLoading: false,
          errorMsg: action.payload
        }
      }

    case getType(GraphActions.graphRequest):
      return {
        ...state,
        fetching: true
      }
    case getType(GraphActions.graphFailure):
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case getType(GraphActions.graphSuccess):
      return {
        ...state,
        fetching: false,
        imgSrc: action.payload
      }
    default: return state;
  }
};
