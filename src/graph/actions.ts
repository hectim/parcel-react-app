import { createAction } from 'typesafe-actions';

export const graphRequest = createAction('GRAPH_REQUEST')

export const graphCancel = createAction('GRAPH_CANCEL')

export const graphSuccess = createAction('GRAPH_SUCCESS', (graph: string) => ({
  type: 'GRAPH_SUCCESS',
  payload: graph,
}))

export const graphFailure = createAction('GRAPH_FAILURE', (error: string) => ({
  type: 'GRAPH_FAILURE',
  payload: error,
}))
