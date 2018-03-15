import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, GenericStoreEnhancer} from "redux";
// import createSagaMiddleware from "redux-saga";
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApiReducer, RootState } from './redux';
import { ApiAction } from './actions';
import { RootEpic } from './observable';
import App from "./App";
// import { watcherSaga } from "./sagas";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";


function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [
    createEpicMiddleware(RootEpic),
  ];

  // compose enhancers with dev tools
  const enhancer = composeWithDevTools(compose(
    applyMiddleware(...middlewares)
  ));

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
    <App parentPropsExample={"a prop"}/>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
