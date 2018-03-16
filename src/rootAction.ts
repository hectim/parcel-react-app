import { $call } from 'utility-types';
import * as _ from 'lodash';

import { DogActions } from './dog/actions';
import { GraphActions } from './graph/actions';


const returnsOfActions = _.map(_.values(_.merge({},
  DogActions,
  GraphActions,
)), $call);
export type RootAction = typeof returnsOfActions[number];
