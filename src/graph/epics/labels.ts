import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { RootState } from '../../rootState';
import { RootAction } from "../../rootAction";
import * as GraphActions from '../actions';
import { Label, UpdateLabel } from '../types';


const createLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.createLabelRequest))
  .do(() => { console.log('create label epic', action$) })
  .flatMap(() => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      .map(res => ({ img: res.response.message, nodeId: 1 }) as Label)
      .do(test => { console.log('lol', test) })
      .map(myLabel => GraphActions.createLabelSuccess(myLabel))
      .catch(error => Observable.of(GraphActions.createLabelFailure(error)))
  })

const deleteLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.deleteLabelRequest))
  .do(() => { console.log('delete label epic', action$) })
  .debounceTime(400)
  .map(action => GraphActions.deleteLabelSuccess({...action.payload} as Label))
  .catch(error => Observable.of(GraphActions.deleteLabelFailure(error)))

const updateLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.updateLabelRequest))
  .do((test) => { console.log('update label epic', test) })
  .flatMap((action) => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      .map(res => ({ img: res.response.message, nodeId: 1, prevImg: action.payload.img}) as UpdateLabel)
      .map(myLabel => GraphActions.updateLabelSuccess(myLabel))
      .catch(error => Observable.of(GraphActions.updateLabelFailure(error)))
  })

export const LabelEpics = combineEpics(
  createLabelEpic,
  deleteLabelEpic,
  updateLabelEpic,
)
