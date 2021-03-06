import { getType } from 'typesafe-actions';
import * as _ from 'lodash';

import { RootAction } from '../../rootAction';
import * as GraphActions from '../actions';


export interface LabelState {
  isLoading: boolean;
  labels: Map<string, number>;
  errorMsg: string;
}

export const InitialLabelState: LabelState = {
  isLoading: false,
  labels: new Map<string, number>(),
  errorMsg: '',
};


export function LabelsReducer(state: LabelState = InitialLabelState, action: RootAction) {
  switch(action.type) {

    /*              */
    /* CREATE LABEL */
    /*              */
    case getType(GraphActions.createLabelRequest):
      return {
        ...state,
        isLoading: true,
      }
    case getType(GraphActions.createLabelSuccess):
      state.labels.set(action.payload.img as string, action.payload.nodeId as number)
      return {
        ...state,
        isLoading: false,
        labels: state.labels
      }
    case getType(GraphActions.createLabelFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    /*              */
    /* UPDATE LABEL */
    /*              */
    case getType(GraphActions.updateLabelRequest):
      return {
        ...state,
        isLoading: true,
      }
    case getType(GraphActions.updateLabelSuccess):
      state.labels.delete(action.payload.prevImg as string);
      state.labels.set(action.payload.img as string, action.payload.nodeId as number)
      return {
        ...state,
        isLoading: false,
        labels: state.labels
      }
    case getType(GraphActions.updateLabelFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      }

    /*              */
    /* DELETE LABEL */
    /*              */
    case getType(GraphActions.deleteLabelRequest):
      return {
        ...state,
        isLoading: true,
      }
    case getType(GraphActions.deleteLabelSuccess):
      state.labels.delete(action.payload.img as string)
      return {
        ...state,
        isLoading: false,
        labels: state.labels
      }
    case getType(GraphActions.deleteLabelFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      }

    default: return state;
  }
};

