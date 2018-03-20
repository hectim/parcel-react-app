import { combineReducers, Reducer, } from 'redux'

import { RootState } from '../../rootState';
import { NodesReducer, NodeState, InitialNodeState } from './nodes';
import { LabelsReducer, LabelState, InitialLabelState } from './labels';


export interface GraphState {
  nodes: NodeState;
  labels: LabelState;
}

export const InitialGraphState: GraphState = {
  nodes: InitialNodeState,
  labels: InitialLabelState
};

export const GraphReducer: Reducer<RootState> = combineReducers({
  nodes: NodesReducer,
  labels: LabelsReducer,
})
