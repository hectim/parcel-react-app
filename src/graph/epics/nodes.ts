import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import * as GraphActions from './actions';
import { GraphNode, UpdateGraphNode } from './types';
