import {
  initialSettingsState,
  settingsReducer,
  Settings,
} from './settings';
import { initialRouterState, routerReducer, Router } from './router';
import { initialUserState, userReducer, User } from './user';

const INITIAL_STATE: AppState = {
  user: initialUserState,
  router: initialRouterState,
  settings: initialSettingsState,
};

export interface AppState {
  user: User;
  router: Router;
  settings: Settings;
}

export const reducer = (
  state: AppState = INITIAL_STATE,
  action: any
) => {
  return {
    user: userReducer(state.user, action),
    router: routerReducer(state.router, action),
    settings: settingsReducer(state.settings, action),
  };
};
