import * as React from "react";
import * as ReactDOM from "react-dom";
import { GenericStoreEnhancer } from 'redux';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs';

import { ApiReducer, RootState } from './redux';
import { ApiAction } from './actions';
import { RootEpic } from './observable';
import App from "./App";
// import { watcherSaga } from "./sagas";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// TODO: add redux dev tools
let composeEnhancers: any = compose;

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [
    createEpicMiddleware(RootEpic),
    // sagaMiddleware,
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore(
    ApiReducer,
    initialState!,
    enhancer
    );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// run the saga
// sagaMiddleware.run(watcherSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
