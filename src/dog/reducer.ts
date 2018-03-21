import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';
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
export const DogReducer = combineReducers<RootAction>({
  fetching: (state = false, action) => {
    switch(action.type) {
      case getType(DogActions.dogRequest):
        return true;
      case getType(DogActions.dogSuccess):
      case getType(DogActions.dogFailure):
      case getType(DogActions.dogCancel):
        return false;
      default: return state;
    }
  },
  error: (state = null, action) => {
    switch(action.type) {
      case getType(DogActions.dogFailure):
        return action.payload;
      default: return state;
    }
  },
  imgSrc: (state = null, action) => {
    switch(action.type) {
      case getType(DogActions.dogSuccess):
        return action.payload;
      default: return state;
    }
  }
})
