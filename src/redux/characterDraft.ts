import { Action } from './helpers';
import {
  Ability,
  CharacterClass,
  BaseStats,
  SavingThrows,
  Skill,
  allSkills,
} from '../data/CharacterSheet';
import { getDatabase } from '../data/Database';

export type SkillsDecleration = {
  [k in Skill]: { value: string; proficient: boolean };
};

export enum DamageType {
  ACID = 'acid',
  BLUDGEONING = 'bludgeoning',
  COLD = 'cold',
  FIRE = 'fire',
  FORCE = 'force',
  LIGHTNING = 'lightning',
  NECROTIC = 'necrotic',
  PIERCING = 'piercing',
  POISON = 'poison',
  PSYCHIC = 'psychic',
  RADIANT = 'radiant',
  SLASHING = 'slashing',
  THUNDER = 'thunder',
}

export interface AttackDamage {
  type: DamageType;
  formula: string;
}

export interface AttackNumbers {
  toHit: string;
  damage: AttackDamage[];
}

export interface AttackDescriptor {
  name: string;
  count: number;
  melee: AttackNumbers | undefined;
  ranged: AttackNumbers | undefined;
}

export interface CharacterSheetDraft {
  name: string | undefined;
  race: string;
  subrace: string | null; // null is valid, it means no subrace.
  classes: CharacterClass[];
  abilityScores: { [k in Ability]: string };
  speed: string;
  ac: string;
  maxHealth: string;
  initiative: string;
  inspiration: string;
  passiveWisdom: string;
  profBonus: string;
  xp: string;
  hitDice: {
    number: string;
    type: string;
  };
  savingThrows: {
    [k in Ability]: { value: string; proficient: boolean };
  };
  skills: SkillsDecleration;
  attacks: AttackDescriptor[];
}

export interface CharacterDraftAction extends Action {
  fields: Partial<CharacterSheetDraft>;
}

const db = getDatabase();
const initRace = db.getRaceIdFromIndex(0);
const initSubrace = db.getSubRaceIdFromIndex(initRace, 0);

const allSkillObj = {} as Partial<SkillsDecleration>;
for (const skill of allSkills) {
  allSkillObj[skill as Skill] = {
    value: '0',
    proficient: false,
  };
}
const initSkills = allSkillObj as SkillsDecleration;

export const initialCharacterDraft: CharacterSheetDraft = {
  name: undefined,
  race: initRace,
  subrace: initSubrace,
  classes: [],
  abilityScores: {
    [Ability.STR]: '10',
    [Ability.DEX]: '10',
    [Ability.CON]: '10',
    [Ability.INT]: '10',
    [Ability.WIS]: '10',
    [Ability.CHR]: '10',
  },
  speed: '30',
  ac: '10',
  maxHealth: '10',
  initiative: '0',
  inspiration: '0',
  passiveWisdom: '10',
  profBonus: '2',
  xp: '0',
  hitDice: {
    number: '1',
    type: '8',
  },
  savingThrows: {
    [Ability.STR]: {
      value: '0',
      proficient: false,
    },
    [Ability.DEX]: {
      value: '0',
      proficient: false,
    },
    [Ability.CON]: {
      value: '0',
      proficient: false,
    },
    [Ability.INT]: {
      value: '0',
      proficient: false,
    },
    [Ability.WIS]: {
      value: '0',
      proficient: false,
    },
    [Ability.CHR]: {
      value: '0',
      proficient: false,
    },
  },
  skills: initSkills,
  attacks: [],
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
