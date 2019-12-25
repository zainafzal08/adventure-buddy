import { initalSettingsState, settingsReducer } from './settings';

const INITIAL_STATE = {
  settings: initalSettingsState,
};

export type AppState = typeof INITIAL_STATE;

export const reducer = (state: any = INITIAL_STATE, action: any) => {
  return {
    settings: settingsReducer(state.settings, action),
  };
};
