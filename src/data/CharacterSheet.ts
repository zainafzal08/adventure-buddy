import { Skill, allSkills } from './skills';
import { ClassDescriptor, CLASSES } from './classes';
import { Ability } from './ability';
import { AttackDescriptor } from './attack';
import { first } from '../util';

type SkillsDecleration = {
  [k in Skill]: { value: string; proficient: boolean };
};

export interface CharacterSheet {
  name: string | undefined;
  /** Key in RACES which reresents this characters race. */
  race: string;
  /** Key which reresents this characters race, null means no subrace. */
  subrace: string | null;
  classes: ClassDescriptor[];
  abilityScores: { [k in Ability]: number };
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
  savingThrows: {
    [k in Ability]: { value: number; proficient: boolean };
  };
  skills: SkillsDecleration;
  attacks: AttackDescriptor[];
}

const DEFAULT_CHARACTER_SHEET: CharacterSheet = {
  name: 'Ethor Stonebeard',
  race: 'human',
  subrace: null,
  classes: [first(CLASSES)],
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
  skills: allSkills.reduce(
    (acc, v) => ({ ...acc, [v]: { value: 0, proficient: false } }),
    {}
  ) as SkillsDecleration,
  attacks: [],
};

export function getDefaultCharacterSheet(): CharacterSheet {
  return {
    ...DEFAULT_CHARACTER_SHEET,
  };
}
