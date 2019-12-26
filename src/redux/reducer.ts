import {
  initalSettingsState,
  settingsReducer,
  Settings,
} from './settings';
import { initialRouterState, routerReducer, Router } from './router';

const INITIAL_STATE: AppState = {
  router: initialRouterState,
  settings: initalSettingsState,
};

export interface AppState {
  router: Router;
  settings: Settings;
}

export const reducer = (
  state: AppState = INITIAL_STATE,
  action: any
) => {
  return {
    router: routerReducer(state.router, action),
    settings: settingsReducer(state.settings, action),
  };
};
