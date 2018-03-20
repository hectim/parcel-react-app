import { combineEpics } from 'redux-observable';

import { DogEpics } from './dog/epics';
import { RootGraphEpics } from './graph/epics';


export const RootEpic = combineEpics(
  DogEpics,
  RootGraphEpics
)
