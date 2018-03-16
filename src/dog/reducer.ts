import { getType } from 'typesafe-actions';

import { RootAction } from '../rootAction';
import * as DogActions from './actions';


/* === State === */
export type DogState = {
  readonly fetching: boolean;
  readonly error: string;
  readonly imgSrc: string;
};

export const InitialDogState: DogState = {
  fetching: false,
  error: '',
  imgSrc: ''
};


/* === REDUCER === */
export function DogReducer(state: DogState = InitialDogState, action: RootAction) {
  switch(action.type) {
    case getType(DogActions.dogRequest):
      return {
        ...state,
        fetching: !state.fetching
      }
    case getType(DogActions.dogFailure):
      return {
        ...state,
        error: action.payload
      }
    case getType(DogActions.dogSuccess):
      return {
        ...state,
        imgSrc: action.payload
      }
    default: return state;
  }
};
