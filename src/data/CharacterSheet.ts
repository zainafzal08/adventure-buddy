import { Skill, allSkills } from './skills';
import { ClassDescriptor, CLASSES } from './classes';
import { Ability } from './ability';
import { AttackDescriptor } from './attack';
import { first } from '../util';

export interface ModifiableValue {
  value: number;
  proficient: boolean;
}

export type SkillsDeclaration = {
  [k in Skill]: ModifiableValue;
};

export type SavingThrowsDeclaration = {
  [k in Ability]: ModifiableValue;
};

export type AbilityScoresDeclaration = { [k in Ability]: number };

export interface DiceDescriptor {
  count: number;
  type: number;
}

export interface HealthDeclaration {
  max: number;
  current: number;
  // Temporary health is represented as a effect.
}

export interface InfoDeclaration {
  background: string;
  alignment: string;
  personality: string;
  languages: string[];
  proficiencies: string[];
  features: string[];
  traits: string[];
}

export interface HitDiceDeclaration {
  type: number;
  count: number;
  max: number;
}

export interface Equipment {
  gold: number;
}

export interface SpellSlotDeclaration {
  count: number;
  max: number;
}

export interface SpellCastingDeclaration {
  /** spellSlots[5] gives us the number of 5th level spell slots */
  slots: SpellSlotDeclaration[];
  maxAvailable: number;
  available: number[];
  ability: Ability;
  spellAttack: number;
  spellSaveDC: number;
}

export interface Effect {
  name: string;
  field: string;
  change: number;
}

export interface CharacterSheet {
  name: string | undefined;
  /** Key in RACES which reresents this characters race. */
  race: string;
  /** Key which reresents this characters race, null means no subrace. */
  subrace: string | null;
  classes: ClassDescriptor[];
  abilityScores: AbilityScoresDeclaration;
  speed: number;
  ac: number;
  health: HealthDeclaration;
  info: InfoDeclaration;
  initiative: number;
  inspiration: number;
  passiveWisdom: number;
  profBonus: number;
  xp: number;
  hitDice: HitDiceDeclaration;
  savingThrows: SavingThrowsDeclaration;
  skills: SkillsDeclaration;
  attacks: AttackDescriptor[];
  // null for peeps with no spells.
  spellCasting: SpellCastingDeclaration | null;
  equipment: Equipment;
  /** Stuff like 'shield-of-faith' has +2 to AC. */
  effects: Effect[];
}

const DEFAULT_CHARACTER_SHEET: CharacterSheet = {
  name: 'John Smith',
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
  spellCasting: null,
  equipment: {
    gold: 50,
  },
  info: {
    background: '',
    alignment: '',
    personality: '',
    languages: [],
    proficiencies: [],
    features: [],
    traits: [],
  },
  speed: 30,
  ac: 10,
  health: {
    max: 10,
    current: 10,
  },
  effects: [],
  initiative: 0,
  inspiration: 0,
  passiveWisdom: 10,
  profBonus: 2,
  xp: 0,
  hitDice: {
    count: 1,
    max: 1,
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
  ) as SkillsDeclaration,
  attacks: [],
};

export function getDefaultCharacterSheet(): CharacterSheet {
  return {
    ...DEFAULT_CHARACTER_SHEET,
  };
}
