import { createAction } from 'typesafe-actions';

export const DogActions = {
  request: createAction('REQUEST'),
  cancel: createAction('CANCEL'),
  success: createAction('SUCCESS', (dog: string) => ({
    type: 'SUCCESS',
    payload: dog,
  })),
  failure: createAction('FAILURE', (error: string) => ({
    type: 'FAILURE',
    payload: error,
  })),
}
