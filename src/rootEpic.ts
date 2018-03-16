import { combineEpics } from 'redux-observable';

import { DogEpics } from './dog/epics';


export const RootEpic = combineEpics(DogEpics)
