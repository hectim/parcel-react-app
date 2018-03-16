import { $call } from 'utility-types';
import * as _ from 'lodash';

import { DogActions } from './dog/actions';


const returnsOfActions = _.map(_.values(DogActions), $call);
export type RootAction = typeof returnsOfActions[number];
