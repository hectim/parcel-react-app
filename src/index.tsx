import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, GenericStoreEnhancer} from "redux";
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

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

const initialState: object = {};

const devToolsExtension: GenericStoreEnhancer = window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

const store = createStore(ApiReducer,
  compose(
    applyMiddleware(createEpicMiddleware(RootEpic)),
    devToolsExtension
  ) as GenericStoreEnhancer
);

// run the saga
// sagaMiddleware.run(watcherSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
