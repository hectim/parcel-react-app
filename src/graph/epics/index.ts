import { combineEpics } from 'redux-observable';

import { nodeEpics } from './nodes.ts';
import { labelEpics } from './labels.ts';

export const RootGraphEpics = combineEpics(
  nodeEpics,
  labelEpics,
)
