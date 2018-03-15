import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, GenericStoreEnhancer} from "redux";
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApiReducer, RootState } from './redux';
import { ApiAction } from './actions';
import { RootEpic } from './observable';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";


function configureStore(initialState?: RootState) {
  // configure middleware
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

const store = configureStore();


// Hot reload reducers
if (module.hot) {
  module.hot.accept(() => {
    const nextReducer = require('./redux').ApiReducer;
    store.replaceReducer(nextReducer);
  })
}

ReactDOM.render(
  <Provider store={store}>
    <App parentPropsExample={"a prop"}/>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
