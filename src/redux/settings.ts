import { update, Action } from './helpers';
import { ThemeName } from '../themes';

export interface Settings {
  theme: ThemeName;
}

export interface SettingsAction extends Action {
  value: string;
}

export const initialSettingsState: Settings = {
  theme: 'peach',
};

export function settingsReducer(
  settings: Settings,
  action: SettingsAction
): Settings {
  switch (action.type) {
    case 'UPDATE_THEME':
      return update(settings, 'theme', action.value);
    default:
      return settings;
  }
}
