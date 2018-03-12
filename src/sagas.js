import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { apiCallSuccess, apiCallFailure, TypeKeys } from "./actions"

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(TypeKeys.REQUEST, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;
    // dispatch a success action to the store with the new dog
    yield put(apiCallSuccess(dog));
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log('whoops', typeof error, error)
    yield put(apiCallFailure(error));
  }
}

// function that returns api response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}
