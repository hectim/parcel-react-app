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
  },
  fetching: false,
  error: '',
  imgSrc: ''
};


/* === REDUCER === */
export const GraphReducer = combineReducers<RootAction>({
  nodes: (state = {}, action) => {
    console.log('in nodes reducer', state);
    return combineReducers<RootAction>({
      isLoading: (state = false, action) => {
        switch(action.type) {
          case getType(GraphActions.requestAddNode):
            console.log('the state in isLoading reducer: ', state);
            return true;
          case getType(GraphActions.cancelAddNode):
          case getType(GraphActions.successAddNode):
          case getType(GraphActions.failureAddNode):
            return false;
          default: 
            console.log('isLoading action: ', getType(action.type));
            console.log('isLoading default: ', state);
            return state;
        };
      },
      nodes: (state = [], action) => {
        switch(action.type) {
          // TODO more CRUD
          case getType(GraphActions.successAddNode):
            console.log('the state in isLoading reducer: ', state);
            return [...state, action.node];
          default: return state;
        };
      },
    })
  },
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
