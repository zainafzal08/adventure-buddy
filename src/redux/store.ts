import { createStore, StoreEnhancer } from 'redux';
import { reducer, AppState, INITIAL_STATE } from './reducer';
import { initialRouterState } from './router';
import { User, initialUserState } from './user';
import { Settings, initialSettingsState } from './settings';

function defaultState(key: string) {
  switch (key) {
    case 'user':
      return initialUserState;
    case 'settings':
      return initialSettingsState;
    default:
      console.error(
        `Attempted to fetch unknown key '${key}' from localstorage.`
      );
      return null;
  }
}

function getFromStorage(key: string) {
  const value = localStorage.getItem(`persisted-${key}`);
  if (value === null) {
    return defaultState(key);
  }
  return JSON.parse(value);
}

function saveToLocalStorage(store: AppState, key: keyof AppState) {
  localStorage.setItem(`persisted-${key}`, JSON.stringify(store[key]));
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
  }
}

// Grab initial state from localstorage.
const initalState = {
  ...INITIAL_STATE,
  router: initialRouterState,
  user: getFromStorage('user') as User,
  settings: getFromStorage('settings') as Settings,
};

export const store = createStore(
  reducer,
  initalState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Persist to localstorage.
store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state, 'user');
  saveToLocalStorage(state, 'settings');
});
