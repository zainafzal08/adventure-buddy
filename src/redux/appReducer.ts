import { AppState, initalState } from './appState';
import { User } from '../data/user';
import { Router } from '../data/router';
import { Settings } from '../data/settings';
import { ThemeKey } from '../data/themes';
import { Action } from 'redux';

/** Simple action to update some field to some value. */
export interface SimpleAction<T> extends Action {
  type: string;
  value: T;
}

export type AppAction = SimpleAction<any>;

function userReducer(
  user: User,
  action: SimpleAction<Partial<firebase.UserInfo>>
) {
  switch (action.type) {
    case '@@user/UPDATE_USER':
      return {
        ...user,
        ...action.value,
      } as User;
    case '@@user/CLEAR_USER':
      return null;
    default:
      return user;
  }
}

function routerReducer(router: Router, action: SimpleAction<string>) {
  switch (action.type) {
    case '@@router/UPDATE_LOCATION':
      return {
        ...router,
        location: action.value,
      };
    default:
      return router;
  }
}

function settingsReducer(
  settings: Settings,
  action: SimpleAction<ThemeKey>
) {
  switch (action.type) {
    case '@@settings/UPDATE_THEME':
      return {
        ...settings,
        theme: action.value,
      };
    default:
      return settings;
  }
}

export const appReducer = (
  state: AppState = initalState(),
  action: AppAction
) => ({
  user: userReducer(state.user, action),
  router: routerReducer(state.router, action),
  settings: settingsReducer(state.settings, action),
});
