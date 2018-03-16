import { createAction } from 'typesafe-actions';

export const dogRequest = createAction('DOG_REQUEST')

export const dogCancel = createAction('DOG_CANCEL')

export const dogSuccess = createAction('DOG_SUCCESS', (dog: string) => ({
  type: 'DOG_SUCCESS',
  payload: dog,
}))

export const dogFailure = createAction('DOG_FAILURE', (error: string) => ({
  type: 'DOG_FAILURE',
  payload: error,
}))
