import { combineReducers, Reducer, } from 'redux'

import { RootState } from './rootState';
import { DogReducer } from './dog/reducer';


export const RootReducer: Reducer<RootState> = combineReducers({
  dog: DogReducer,
})
