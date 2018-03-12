/* === ACTIONS === */

import { TypeKeys } from './actions'
import { isTypeOf, successType, requestType, failureType } from './types'

//action types
// const API_CALL_REQUEST = "API_CALL_REQUEST";
// const API_CALL_SUCCESS = "API_CALL_SUCCESS";
// const API_CALL_FAILURE = "API_CALL_FAILURE";

/*

 We're not gonna use action creators in this app.

 For something so simple, they may muddy the waters.

 Also, you'll see how redux-saga handles and dispatches actions
 more clearly (in my opinion) without them.

 For those who wish to stick to convention, here are some
 action creators.

//action creators
function apiCallRequest() {
  return { type: API_CALL_REQUEST };
}

function apiCallSuccess(data) {
  return { type: API_CALL_SUCCESS, data };
}

function apiCallFailure(error) {
  return { type: API_CALL_FAILURE, error };
}

 */

/* === REDUCER === */
export type State = {
  readonly fetching : boolean;
  readonly dog : string;
  readonly error : string;
}

let state:State = {
  fetching: false;
  dog: null;
  error: null;
}




export function reducer(state: State, action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.REQUEST:
      console.log('hit request reducer', action)
      return { ...state, fetching: true, error: null };
      break;
    case TypeKeys.SUCCESS:
      console.log('hit request reducer', action)
      return { ...state, fetching: false, dog: action.dog };
      break;
    case TypeKeys.FAILURE:
      console.log('hit request reducer', action)
      return { ...state, fetching: false, dog: null, error: action.error };
      break;
    default:
      return state;
  }
}
