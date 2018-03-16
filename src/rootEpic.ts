import { combineEpics } from 'redux-observable';

import { DogEpics } from './dog/epics';
import { GraphEpics } from './graph/epics';


export const RootEpic = combineEpics(
  DogEpics,
  GraphEpics
)
