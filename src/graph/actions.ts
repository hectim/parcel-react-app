import { createAction } from 'typesafe-actions';
import { GraphNode, Label, UpdateLabel, UpdateGraphNode } from './types';

// Add Node
export const requestAddNode = createAction('GRAPH_REQUEST_ADD_NODE');
export const successAddNode = createAction('GRAPH_ADD_NODE', (node: GraphNode) => ({
  type: 'GRAPH_ADD_NODE',
  payload: node,
}));
export const failureAddNode = createAction('GRAPH_FAILURE_ADD_NODE', (error: string) => ({
  type: 'GRAPH_FAILURE_ADD_NODE',
  payload: error,
}));

export const requestRemoveNode = createAction('GRAPH_REQUEST_REMOVE_NODE', (node: GraphNode) => ({
  type: 'GRAPH_REQUEST_REMOVE_NODE',
  payload: node
}));
export const successRemoveNode = createAction('GRAPH_REMOVE_NODE', (node: GraphNode) => ({
  type: 'GRAPH_REMOVE_NODE',
  payload: node,
}));
export const failureRemoveNode = createAction('GRAPH_FAILURE_REMOVE_NODE', (error: string) => ({
  type: 'GRAPH_FAILURE_REMOVE_NODE',
  payload: error,
}));


export const requestUpdateNode = createAction('GRAPH_REQUEST_UPDATE_NODE', (node: GraphNode) => ({
  type: 'GRAPH_REQUEST_UPDATE_NODE',
  payload: node
}));
export const successUpdateNode = createAction('GRAPH_UPDATE_NODE', (node: UpdateGraphNode) => ({
  type: 'GRAPH_UPDATE_NODE',
  payload: node,
}));
export const failureUpdateNode = createAction('GRAPH_FAILURE_UPDATE_NODE', (error: string) => ({
  type: 'GRAPH_FAILURE_UPDATE_NODE',
  payload: error,
}));

// Add Label (map of label name to nodeids)
export const createLabelRequest = createAction('GRAPH_CREATE_LABEL_REQUEST')
export const createLabelSuccess = createAction('GRAPH_CREATE_LABEL_SUCCESS', (label: Label) => ({
  type: 'GRAPH_CREATE_LABEL_SUCCESS',
  payload: label,
}));
export const createLabelFailure = createAction('GRAPH_CREATE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_CREATE_LABEL_FAILURE',
  payload: error,
}));

export const updateLabelRequest = createAction('GRAPH_UPDATE_LABEL_REQUEST', (label: Label) => ({
  type: 'GRAPH_UPDATE_LABEL_REQUEST',
  payload: label,
}));
export const updateLabelSuccess = createAction('GRAPH_UPDATE_LABEL_SUCCESS', (label: UpdateLabel) => ({
  type: 'GRAPH_UPDATE_LABEL_SUCCESS',
  payload: label,
}));
export const updateLabelFailure = createAction('GRAPH_UPDATE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_UPDATE_LABEL_FAILURE',
  payload: error,
}));

export const deleteLabelRequest = createAction('GRAPH_DELETE_LABEL_REQUEST', (label: Label) => ({
  type: 'GRAPH_DELETE_LABEL_REQUEST',
  payload: label
}));
export const deleteLabelSuccess = createAction('GRAPH_DELETE_LABEL_SUCCESS', (label: Label) => ({
  type: 'GRAPH_DELETE_LABEL_SUCCESS',
  payload: label,
}));
export const deleteLabelFailure = createAction('GRAPH_DELETE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_DELETE_LABEL_FAILURE',
  payload: error,
}));
