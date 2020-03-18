import { createStore, StoreEnhancer } from 'redux';
import { appReducer } from './appReducer';
import { initalState, saveState } from './appState';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
  }
}

export const store = createStore(
  appReducer,
  initalState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Persist to localstorage.
store.subscribe(() => {
  saveState(store.getState());
});
