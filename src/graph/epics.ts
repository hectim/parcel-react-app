import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import * as GraphActions from './actions';

const graphEpics: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(GraphActions.graphRequest))
    .debounceTime(400)
    .flatMap(() => {
      return Observable
        .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
        // delay to allow cancellation
        .delay(2000)
        .takeUntil(action$.filter(isActionOf(GraphActions.graphCancel)))
        .map(res => res.response.message)
        .map(imgSrc => GraphActions.graphSuccess(imgSrc))
        .catch(error => Observable.of(GraphActions.graphFailure(error)))
    })

const nodeEpics: Epic<RootAction, RootState> = (action$, store) => action$
    .filter(isActionOf(GraphActions.requestAddNode))
    .debounceTime(400)
    .delay(2000)
    .map(() => {
      return [id: 10, type: 'pipeline' ]
    })
    .map(node => GraphActions.successAddNode(node))
// TODO add cancel and failure


export const RootGraphEpic = combineEpics(
  nodeEpics,
  graphEpics
)
