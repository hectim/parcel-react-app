import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { RootAction } from '../rootAction';
import * as GraphActions from './actions';



// TODO
// object
// map
// array

export interface Node { id: number; type: string };
export interface Label { name: string; nodeId: number };
export interface UpdateLabel { name: string; nodeId: number; prevName: string };

/* === State === */
export interface GraphState {
  nodes: {
    isLoading: boolean;
    nodes: Node[];
    errorMsg: string;
  },
  labels: {
    isLoading: boolean;
    labels: Map<string, number>;
  }
};

// TODO stop using initial state here. it is being repeated by the reducer.
export const InitialGraphState: GraphState = {
  nodes: {
    isLoading: false,
    nodes: [],
    errorMsg: '',
  },
  labels: {
    isLoading: false,
    labels: new Map<string, number>(),
  }
};

/* === REDUCER === */
export const GraphReducer = combineReducers<RootAction>({
  nodes: (state = InitialGraphState.nodes, action) => {
    return {
      isLoading: (function() {
        console.log('isLoading: ', state, action)
        switch(action.type) {
          case getType(GraphActions.requestAddNode):
            console.log('the state in isLoading reducer: ', state);
            return true;
          case getType(GraphActions.cancelAddNode):
          case getType(GraphActions.successAddNode):
          case getType(GraphActions.failureAddNode):
            return false;
          default:
            console.log('isLoading action: ', action.type);
            console.log('isLoading default: ', state);
            return state.isLoading;
        };
      }()),
      nodes: (function() {
        console.log('nodes substate: ', state, action, 'type', state["nodes"])
        switch(action.type) {
          // TODO more CRUD
          case getType(GraphActions.successAddNode):
            console.log('the state in isLoading reducer: ', state);
            return state.nodes.concat(action.payload);
          default: return state.nodes;
        };
      }()),
    }
  },
  labels: (state = InitialGraphState.labels, action) => {
    return {
      isLoading: (function() {
        console.log('isLoading label', state, action)
        switch(action.type){
          case getType(GraphActions.createLabelRequest):
          case getType(GraphActions.deleteLabelRequest):
          case getType(GraphActions.updateLabelRequest):
            return true;
          case getType(GraphActions.createLabelSuccess):
          case getType(GraphActions.deleteLabelSuccess):
          case getType(GraphActions.updateLabelSuccess):
          case getType(GraphActions.createLabelFailure):
          case getType(GraphActions.deleteLabelFailure):
          case getType(GraphActions.updateLabelFailure):
            return false;
          default: return state.isLoading;
        }
      }()),
      labels: (function() {
        console.log('labels.labels reducer', state, action)
        switch(action.type){
          case getType(GraphActions.createLabelSuccess):
            state.labels.set(action.payload.name, action.payload.nodeId);
            return state.labels;
          case getType(GraphActions.deleteLabelSuccess):
            state.labels.delete(action.payload.name);
            return state.labels;
          case getType(GraphActions.updateLabelSuccess):
            if(state.labels.get(action.payload.prevName)){
              state.labels.delete(action.payload.prevName);
            }
            state.labels.set(action.payload.name, action.payload.nodeId);
            return state.labels;
          case getType(GraphActions.createLabelFailure):
          case getType(GraphActions.deleteLabelFailure):
          case getType(GraphActions.updateLabelFailure):
            console.error('Error from api call --', action.payload)
          default: return state.labels; // no changes
        }
      }()),
    }
  }
});
// export function GraphReducer(state: GraphState = InitialGraphState, action: RootAction) {
//   switch(action.type) {
//     case getType(GraphActions.requestAddNode):
//       return {
//         ...state,
//         nodes: {
//           ...state.nodes,
//           isLoading: true
//         }
//       }
//     case getType(GraphActions.cancelAddNode):
//       return {
//         ...state,
//         nodes: {
//           ...state.nodes,
//           isLoading: false
//         }
//       }
//     case getType(GraphActions.successAddNode):
//       return {
//         ...state,
//         nodes: {
//           ...state.nodes,
//           isLoading: false,
//           nodes: state.nodes.nodes.concat(action.payload)
//         }
//       }
//     case getType(GraphActions.failureAddNode):
//       return {
//         ...state,
//         nodes: {
//           ...state.nodes,
//           isLoading: false,
//           errorMsg: action.payload
//         }
//       }

//     case getType(GraphActions.graphRequest):
//       return {
//         ...state,
//         fetching: true
//       }
//     case getType(GraphActions.graphFailure):
//       return {
//         ...state,
//         fetching: false,
//         error: action.payload
//       }
//     case getType(GraphActions.graphSuccess):
//       return {
//         ...state,
//         fetching: false,
//         imgSrc: action.payload
//       }
//     default: return state;
//   }
// };
