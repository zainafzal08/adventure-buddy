import { createStore, compose, combineReducers } from 'redux';
import { reducer } from './reducer';
import { lazyReducerEnhancer } from 'pwa-helpers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(lazyReducerEnhancer(combineReducers))
);
