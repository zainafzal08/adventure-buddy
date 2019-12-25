import { update, Action } from './helpers';

export interface Settings {
  theme: string;
}

export interface SettingsAction extends Action {
  value: string;
}

export const initalSettingsState: Settings = {
  theme: 'peach',
};

export function settingsReducer(
  settings: Settings,
  action: SettingsAction
) {
  switch (action.type) {
    case 'UPDATE_THEME':
      return update(settings, 'theme', action.value);
    default:
      return settings;
  }
}
