import { User, defaultUser } from '../data/user';
import { Router, defaultRouter } from '../data/router';
import { Settings, defaultSettings } from '../data/settings';

export interface AppState {
  user: User;
  router: Router;
  settings: Settings;
}

/** All the fields in AppState we want to persist across refreshes. */
const persisted: (keyof AppState)[] = ['user', 'settings'];

const INITIAL_STATE = {
  user: defaultUser(),
  router: defaultRouter(),
  settings: defaultSettings(),
};

export function initalState() {
  const state: AppState = { ...INITIAL_STATE };
  for (const k of persisted) {
    const savedValue = localStorage.getItem(`persisted-${k}`);
    if (!savedValue) continue;
    state[k] = JSON.parse(savedValue);
  }
  return state;
}

export function saveState(state: AppState) {
  for (const k of persisted) {
    const v = JSON.stringify(state[k]);
    localStorage.setItem(`persisted-${k}`, v);
  }
}
