import { getType } from 'typesafe-actions';
import * as _ from 'lodash';

import { RootAction } from '../../rootAction';
import * as GraphActions from '../actions';
import { GraphNode } from '../types';


export interface NodeState {
  isLoading: boolean;
  nodes: GraphNode[];
  errorMsg: string;
};

export const InitialNodeState: NodeState = {
  isLoading: false,
  nodes: [],
  errorMsg: '',
};


export function NodesReducer(state: NodeState = InitialNodeState, action: RootAction) {
  switch(action.type) {
    /*              */
    /* CREATE NODE  */
    /*              */
    case getType(GraphActions.requestAddNode):
      return {
        ...state,
        isLoading: true
      }
    case getType(GraphActions.cancelAddNode):
      return {
        ...state,
        isLoading: false
      }
    case getType(GraphActions.successAddNode):
      // clone array
      let cloned: GraphNode[] = [];
      state.nodes.map(node => cloned.push(node));
      cloned.push(action.payload);
      return {
        ...state,
        isLoading: false,
        nodes: cloned
      }
    case getType(GraphActions.failureAddNode):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    case getType(GraphActions.requestRemoveNode):
      return {
        ...state,
        isLoading: true,
      }
    case getType(GraphActions.cancelRemoveNode):
      return {
        ...state,
        isLoading: false,
      }
    case getType(GraphActions.successRemoveNode):
      return {
        ...state,
        isLoading: false,
        nodes: [ ...state.nodes, action.payload ],
      }
    case getType(GraphActions.failureRemoveNode):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      }

    case getType(GraphActions.requestUpdateNode):
      return {
        ...state,
        isLoading: true,
      }
    case getType(GraphActions.cancelUpdateNode):
      return {
        ...state,
        isLoading: false,
      }
    case getType(GraphActions.successUpdateNode):
      let copy: GraphNode[] = [...state.nodes];
      let index: number = _.findIndex(copy, { img: action.payload.prevImg });
      let newNode: GraphNode = { id: action.payload.id, img: action.payload.img, type: action.payload.type }
      copy[index] = newNode
      return {
        ...state,
        isLoading: false,
        nodes: copy,
      }
    case getType(GraphActions.failureUpdateNode):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      }
    default: return state;
  }
};
