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
export const DogReducer = combineReducers<DogActions>({
  fetching: (state = false, action) => {
    switch(action.type) {
      case getType(DogActions.request):
        return true;
      case getType(DogActions.success):
      case getType(DogActions.failure):
        return false;
      default: return state;
    }
  },
  error: (state = null, action) => {
    switch(action.type) {
      case getType(DogActions.failure):
        return action.payload;
      default: return state;
    }
  },
  imgSrc: (state = null, action) => {
    switch(action.type) {
      case getType(DogActions.success):
        return action.payload;
      default: return state;
    }
  }
})
