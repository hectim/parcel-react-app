import { combineEpics } from 'redux-observable';

import { NodeEpics } from './nodes';
import { LabelEpics } from './labels';

export const RootGraphEpics = combineEpics(
  NodeEpics,
  LabelEpics,
)
