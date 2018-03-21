import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { RootState } from '../../rootState';
import { RootAction } from "../../rootAction";
import * as GraphActions from '../actions';
import { GraphNode, UpdateGraphNode } from '../types';


const createNodeEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.requestAddNode))
  .do(() => { console.log('in node epic'); })
  .debounceTime(400)
  .flatMap(() => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      .map(res => ({ img: res.response.message, id: 400, type: 'pipeline'}) as GraphNode)
      .map(myNode => GraphActions.successAddNode(myNode))
      .catch(error => Observable.of(GraphActions.failureAddNode(error)))
  })

const deleteNodeEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.requestRemoveNode))
  .do((test) => { console.log('delete node epic', test) })
  .debounceTime(400)
  .map(action => GraphActions.successRemoveNode({ ...action.payload } as GraphNode))
  .catch(error => Observable.of(GraphActions.failureRemoveNode(error)))

const updateNodeEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.requestUpdateNode))
  .do((test) => { console.log('update node epic', test) })
  .flatMap((action) => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      .map(res => ({ img: res.response.message, type: 'action', id: 13, prevImg: action.payload.img}) as UpdateGraphNode)
      .map(myNode => GraphActions.successUpdateNode(myNode))
      .catch(error => Observable.of(GraphActions.failureUpdateNode(error)))
  })

export const NodeEpics = combineEpics(
  createNodeEpic,
  updateNodeEpic,
  deleteNodeEpic,
)
