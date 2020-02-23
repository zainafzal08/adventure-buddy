import {
  initialSettingsState,
  settingsReducer,
  Settings,
} from './settings';
import { initialRouterState, routerReducer, Router } from './router';
import { initialUserState, userReducer, User } from './user';
import {
  initialCharacterDraft,
  characterDraftReducer,
  CharacterSheetDraft,
} from './characterDraft';
import { isValid } from './validateCharacter';

export const INITIAL_STATE: AppState = {
  user: initialUserState,
  router: initialRouterState,
  settings: initialSettingsState,
  characterDraft: initialCharacterDraft,
};

export interface AppState {
  user: User;
  router: Router;
  settings: Settings;
  characterDraft: CharacterSheetDraft;
}

export function setField(
  o: any,
  pathArray: string[],
  val: any
): Object {
  let newState;
  const field = pathArray[0];
  pathArray.shift();
  if (field === '') {
    throw Error(
      'Encountered empty string in processing DIRECT_SET action'
    );
  }

  if (pathArray.length === 0) {
    newState = {
      ...o,
      [field]: val,
    };
  }

  newState = {
    ...o,
    [field]: setField(o[field], pathArray, val),
  };

  newState.characterDraft.valid = isValid(newState.characterDraft);
  return newState;
}

export const reducer = (
  state: AppState = INITIAL_STATE,
  action: any
) => {
  const base = {
    user: userReducer(state.user, action),
    router: routerReducer(state.router, action),
    settings: settingsReducer(state.settings, action),
    characterDraft: characterDraftReducer(state.characterDraft, action),
  };
  switch (action.type) {
    case 'DIRECT_SET':
      return setField(base, action.path.split('.'), action.value);
    default:
      return base;
  }
};
