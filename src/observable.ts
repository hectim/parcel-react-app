import { combineEpics, Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs/Observable';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { RootState } from './redux';
import { ApiAction, generalActions } from "./actions";

const getDog: Epic<ApiAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(generalActions.request))
    .debounceTime(200)
    .flatMap(() => {
      return Observable
        .ajax({crossDomain: true, url: 'https://dog.ceo/api/breeds/image/random'})
        .map(res => {
          console.log('~~~~~ in apicall', res);
          return res.data.message;
        })
        .map(dog => generalActions.success(dog))
        .catch(error => Observable.of(generalActions.failure(error)))
    })

export const RootEpic = combineEpics(getDog)
