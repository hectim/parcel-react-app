import { $call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import _ from 'lodash';

export const generalActions = {
  request: createAction('REQUEST'),
  success: createAction('SUCCESS', (dog: string) => ({
    type: 'SUCCESS',
    payload: dog,
  })),
  failure: createAction('FAILURE', (error: string) => ({
    type: 'FAILURE',
    payload: error,
  })),
}


//const returnsOfActions = _.map(_.values(generalActions), $call));
const returnsOfActions = Object.values(generalActions).map($call);
export type ApiAction = typeof returnsOfActions[number];
