import { createAction } from 'typesafe-actions';

export const generalActions = {
  request: createAction('REQUEST'),
  success: createAction('SUCCESS', (dog: string) => ({
    type: 'SUCCESS',
    payload: dog,
  })),
  failure: createAction('FAILURE', (error: string) => ({
    type: 'FAILURE',
    payload: error,
  })),
}
