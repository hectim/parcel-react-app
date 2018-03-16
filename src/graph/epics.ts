import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import { GraphActions } from './actions';

export const GraphEpics: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(GraphActions.request))
    .debounceTime(400)
    .flatMap(() => {
      return Observable
        .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
        // delay to allow cancellation
        .delay(2000)
        .takeUntil(action$.filter(isActionOf(GraphActions.cancel)))
        .map(res => res.response.message)
        .map(imgSrc1 => GraphActions.success(imgSrc1))
        .catch(error1 => Observable.of(GraphActions.failure(error1)))
    })
