import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

import { setup as setupAxiosProgressIndicator } from '../containers/AxiosProgressIndicator';
import reducerRegistry from '../reducer-registry';

export default history => {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const middlewares = [thunkMiddleware.withExtraArgument({ history })];
  const enhancers = [applyMiddleware(...middlewares)];
  const reducer = combineReducers(reducerRegistry.getReducers());
  const store = createStore(reducer, composeEnhancers(...enhancers));

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  setupAxiosProgressIndicator(store.dispatch)(axios);

  return store;
};
