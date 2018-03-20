import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose, GenericStoreEnhancer} from "redux";

import { RootReducer } from './rootReducer';
import { RootState, InitialState } from './rootState';
import { RootEpic } from './rootEpic';


function configureStore(initialState?: RootState) {
  // configure middleware
  const middlewares = [
    createEpicMiddleware(RootEpic),
  ];

  // compose enhancers with dev tools
  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  // create store
  const store = createStore(
    RootReducer,
    initialState!,
    enhancer
  );

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept(() => {
      // TODO hot reload epics
      // https://github.com/reactjs/react-redux/issues/602
      // const nextEpic = require('./rootEpic').RootEpic;
      // Store.replaceMiddleware(nextEpic);
      const nextReducer = require('./rootReducer').RootReducer;
      Store.replaceReducer(nextReducer);
    })
  }

  return store;
}

export const Store = configureStore(InitialState);
