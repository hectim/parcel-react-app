import { createAction } from 'typesafe-actions';
import { Node } from './reducer';

// TODO delet all these, not useful. just clutter. Delet corresponding reducer & epics
export const graphRequest = createAction('GRAPH_REQUEST');

export const graphCancel = createAction('GRAPH_CANCEL');

export const graphSuccess = createAction('GRAPH_SUCCESS', (graph: string) => ({
  type: 'GRAPH_SUCCESS',
  payload: graph,
}));

export const graphFailure = createAction('GRAPH_FAILURE', (error: string) => ({
  type: 'GRAPH_FAILURE',
  payload: error,
}));


// Add Node
export const requestAddNode = createAction('GRAPH_REQUEST_ADD_NODE');
export const cancelAddNode = createAction('GRAPH_CANCEL_ADD_NODE');
export const successAddNode = createAction('GRAPH_ADD_NODE', (node: Node) => ({
  type: 'GRAPH_ADD_NODE',
  payload: node,
}));
export const failureAddNode = createAction('GRAPH_FAILURE_ADD_NODE', (error: string) => ({
  type: 'GRAPH_FAILURE_ADD_NODE',
  payload: error,
}));
