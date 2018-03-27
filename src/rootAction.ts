import { $call } from 'utility-types';
import * as _ from 'lodash';

import * as DogActions from './dog/actions';
import * as GraphActions from './graph/actions';


const returnsOfActions = {
  ..._.map(_.values(DogActions), $call),
  ..._.map(_.values(GraphActions), $call),
}
// This implicity maps over the whole returnsOfActions object where the key is of type number. This is basically a fancy loop that 'OR's all of the actionTypes.
export type RootAction = typeof returnsOfActions[number];

