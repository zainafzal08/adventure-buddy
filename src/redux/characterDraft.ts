import { Action } from './helpers';
import {
  Ability,
  CharacterClass,
  BaseStats,
  SavingThrows,
} from '../data/CharacterSheet';
import { getDatabase } from '../data/Database';

export interface CharacterSheetDraft {
  name: string | undefined;
  race: string;
  subrace: string | null; // null is valid, it means no subrace.
  classes: CharacterClass[];
  abilityScores: BaseStats;
  speed: number;
  ac: number;
  maxHealth: number;
  initiative: number;
  inspiration: number;
  passiveWisdom: number;
  profBonus: number;
  xp: number;
  hitDice: {
    number: number;
    type: number;
  };
  savingThrows: SavingThrows;
}

export interface CharacterDraftAction extends Action {
  fields: Partial<CharacterSheetDraft>;
}

const db = getDatabase();
const initRace = db.getRaceIdFromIndex(0);
const initSubrace = db.getSubRaceIdFromIndex(initRace, 0);

export const initialCharacterDraft: CharacterSheetDraft = {
  name: undefined,
  race: initRace,
  subrace: initSubrace,
  classes: [],
  abilityScores: {
    [Ability.STR]: 10,
    [Ability.DEX]: 10,
    [Ability.CON]: 10,
    [Ability.INT]: 10,
    [Ability.WIS]: 10,
    [Ability.CHR]: 10,
  },
  speed: 30,
  ac: 10,
  maxHealth: 10,
  initiative: 0,
  inspiration: 0,
  passiveWisdom: 10,
  profBonus: 2,
  xp: 0,
  hitDice: {
    number: 1,
    type: 8,
  },
  savingThrows: {
    [Ability.STR]: {
      value: 0,
      proficient: false,
    },
    [Ability.DEX]: {
      value: 0,
      proficient: false,
    },
    [Ability.CON]: {
      value: 0,
      proficient: false,
    },
    [Ability.INT]: {
      value: 0,
      proficient: false,
    },
    [Ability.WIS]: {
      value: 0,
      proficient: false,
    },
    [Ability.CHR]: {
      value: 0,
      proficient: false,
    },
  },
};

export function characterDraftReducer(
  sheet: CharacterSheetDraft,
  action: CharacterDraftAction
): CharacterSheetDraft {
  switch (action.type) {
    case 'UPDATE_DRAFT':
      return {
        ...sheet,
        ...action.fields,
      };
    case 'CLEAR_DRAFT':
      return initialCharacterDraft;
    default:
      return sheet;
  }
}
