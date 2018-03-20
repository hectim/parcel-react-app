import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import * as GraphActions from './actions';
import { Node, Label, UpdateLabel } from './reducer';

const nodeEpics: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.requestAddNode))
  .do(() => { console.log('in node epic'); })
  .debounceTime(400)
  .delay(2000)
  .takeUntil(action$.filter(isActionOf(GraphActions.cancelAddNode)))
  .mapTo(GraphActions.successAddNode({ id: 100, type: 'pipeline'} as Node))
  .catch(error => Observable.of(GraphActions.failureAddNode(error)))

const createLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.createLabelRequest))
  .do(() => { console.log('create label epic', action$) })
  .debounceTime(400)
  .delay(2000)
  .takeUntil(action$.filter(isActionOf(GraphActions.createLabelCancel)))
  .mapTo(GraphActions.createLabelSuccess({ name: 'fakelabel', nodeId: 11} as Label))
  .catch(error => Observable.of(GraphActions.createLabelFailure(error)))

const deleteLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.deleteLabelRequest))
  .do(() => { console.log('delete label epic', action$) })
  .debounceTime(400)
  .delay(2000)
  .takeUntil(action$.filter(isActionOf(GraphActions.deleteLabelCancel)))
  .mapTo(GraphActions.deleteLabelSuccess({name: 'fakelabel', nodeId: 11} as Label))
  .catch(error => Observable.of(GraphActions.deleteLabelFailure(error)))

const updateLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.updateLabelRequest))
  .do(() => { console.log('update label epic', action$) })
  .debounceTime(400)
  .delay(2000)
  .takeUntil(action$.filter(isActionOf(GraphActions.updateLabelCancel)))
  .mapTo(GraphActions.updateLabelSuccess({name: 'blahblah', nodeId: 11, prevName: 'fakelabel'} as UpdateLabel))
  .catch(error => Observable.of(GraphActions.updateLabelFailure(error)))

export const RootGraphEpics = combineEpics(
  nodeEpics,
  createLabelEpic,
  deleteLabelEpic,
  updateLabelEpic,
)
