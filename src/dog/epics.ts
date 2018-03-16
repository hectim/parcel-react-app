import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import { DogActions } from './actions';

export const DogEpics: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(DogActions.request))
    .debounceTime(400)
    .flatMap(() => {
      return Observable
        .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
        // delay to allow cancellation
        .delay(2000)
        .takeUntil(action$.filter(isActionOf(DogActions.cancel)))
        .map(res => res.response.message)
        .map(imgSrc => DogActions.success(imgSrc))
        .catch(error => Observable.of(DogActions.failure(error)))
    })
