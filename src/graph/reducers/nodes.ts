import { getType } from 'typesafe-actions';

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

    default: return state;
  }
};
