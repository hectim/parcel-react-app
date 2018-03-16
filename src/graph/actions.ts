import { createAction } from 'typesafe-actions';

export const GraphActions = {
  request: createAction('REQUEST'),
  cancel: createAction('CANCEL'),
  success: createAction('SUCCESS', (graph: string) => ({
    type: 'SUCCESS',
    payload: graph,
  })),
  failure: createAction('FAILURE', (error1: string) => ({
    type: 'FAILURE',
    payload: error1,
  })),
}
