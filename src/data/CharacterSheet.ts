import { exhaustiveCheck } from '../util';
import { getDatabase } from './Database';

export enum Ability {
  STR = 'strength',
  DEX = 'dexterity',
  CON = 'constitution',
  INT = 'intelligence',
  WIS = 'wisdom',
  CHR = 'charisma',
}

export const allAbilities = [
  Ability.STR,
  Ability.DEX,
  Ability.CON,
  Ability.INT,
  Ability.WIS,
  Ability.CHR,
];

export type BaseStats = {
  [k in Ability]: number;
};

export type SavingThrows = {
  [k in Ability]: {
    value: number | undefined;
    proficient: boolean;
  };
};

export interface SpecialBonus {
  initative: number;
  speed: number;
  ac: number;
  hp: number;
}

export interface CharacterClass {
  id: string;
  level: number;
}

export interface CharacterSheetDescriptor {
  id: string | null;
  name: string;
  race: string;
  subrace: string | null;
  classes: CharacterClass[];
  baseAC: number;
  speed: number;
  proficiencyBonus: number;
  ability: BaseStats;
  specialBonus: Partial<SpecialBonus>;
  proficiencies: (Skill | Ability)[];
}

export enum Skill {
  ATHLETICS = 'athletics',
  ACROBATICS = 'acrobatics',
  SLEIGHT_OF_HAND = 'sleight of hand',
  STEALTH = 'stealth',
  ARCANA = 'arcana',
  HISTORY = 'history',
  INVESTIGATION = 'investigation',
  NATURE = 'nature',
  RELIGION = 'religion',
  ANIMAL_HANDLING = 'animal handling',
  INSIGHT = 'insight',
  MEDICINE = 'medicine',
  PERCEPTION = 'perception',
  SURVIVAL = 'survival',
  DECEPTION = 'deception',
  INTIMIDATION = 'intimidation',
  PERFORMANCE = 'performance',
  PERSUASION = 'persuasion',
}
export const allSkills = [
  Skill.ATHLETICS,
  Skill.ACROBATICS,
  Skill.SLEIGHT_OF_HAND,
  Skill.STEALTH,
  Skill.ARCANA,
  Skill.HISTORY,
  Skill.INVESTIGATION,
  Skill.NATURE,
  Skill.RELIGION,
  Skill.ANIMAL_HANDLING,
  Skill.INSIGHT,
  Skill.MEDICINE,
  Skill.PERCEPTION,
  Skill.SURVIVAL,
  Skill.DECEPTION,
  Skill.INTIMIDATION,
  Skill.PERFORMANCE,
  Skill.PERSUASION,
];

export function getSkillAbility(skill: Skill): Ability {
  switch (skill) {
    case Skill.ATHLETICS:
      return Ability.STR;
    case Skill.ACROBATICS:
      return Ability.DEX;
    case Skill.SLEIGHT_OF_HAND:
      return Ability.DEX;
    case Skill.STEALTH:
      return Ability.DEX;
    case Skill.ARCANA:
      return Ability.INT;
    case Skill.HISTORY:
      return Ability.INT;
    case Skill.INVESTIGATION:
      return Ability.INT;
    case Skill.NATURE:
      return Ability.INT;
    case Skill.RELIGION:
      return Ability.INT;
    case Skill.ANIMAL_HANDLING:
      return Ability.WIS;
    case Skill.INSIGHT:
      return Ability.WIS;
    case Skill.MEDICINE:
      return Ability.WIS;
    case Skill.PERCEPTION:
      return Ability.WIS;
    case Skill.SURVIVAL:
      return Ability.WIS;
    case Skill.DECEPTION:
      return Ability.CHR;
    case Skill.INTIMIDATION:
      return Ability.CHR;
    case Skill.PERFORMANCE:
      return Ability.CHR;
    case Skill.PERSUASION:
      return Ability.CHR;
    default:
      exhaustiveCheck(skill);
      // We should never hit here but we need to return something
      // in the Ability enum to keep typescript happy.
      return Ability.CHR;
  }
}

export const abilityShorthand = {
  [Ability.STR]: 'Str',
  [Ability.DEX]: 'Dex',
  [Ability.CON]: 'Con',
  [Ability.INT]: 'Int',
  [Ability.WIS]: 'Wis',
  [Ability.CHR]: 'Chr',
};
export interface CharacterDescriptor {
  race: string | undefined;
  subrace: string | null | undefined;
  classes: CharacterClass[];
}

export function toModifier(value: number) {
  return Math.floor((value - 10) / 2);
}

export function generateDescriptor(character: CharacterDescriptor) {
  let raceStr = null;
  let levelStr = null;
  let classStr = '';
  const { classes, race, subrace } = character;
  let level = classes.reduce((acc, x) => acc + x.level, 0);

  if (level > 0) {
    levelStr = `Level ${level}`;
  }
  if (race) {
    raceStr = getDatabase().getRace(race).name;
  }
  if (race && subrace) {
    raceStr = getDatabase().getSubRace(race, subrace).fullName;
  }
  return [levelStr, raceStr, classStr].join(' ');
}

export class CharacterSheet {
  // Character Info.
  id: string;
  name: string;
  race: string;
  subrace: string | null;
  classes: CharacterClass[];
  speed: number;
  inspiration: number;
  proficiencyBonus: number;
  baseAC: number;

  // Stats.
  ability!: BaseStats;
  specialBonus: SpecialBonus;
  temporaryBonus: SpecialBonus;
  proficiencies!: Set<Skill | Ability>;

  constructor(data: CharacterSheetDescriptor) {
    if (!data.id) {
      throw Error('Provided Id must be Non-null');
    }
    this.id = data.id;
    this.name = data.name;
    this.race = data.race;
    this.subrace = data.subrace;
    this.classes = [...data.classes];
    this.ability = data.ability;
    this.inspiration = 0;
    this.baseAC = data.baseAC;
    this.speed = data.speed;
    this.proficiencyBonus = data.proficiencyBonus;
    this.specialBonus = {
      initative: 0,
      speed: 0,
      ac: 0,
      hp: 0,
      ...data.specialBonus,
    };
    this.temporaryBonus = {
      initative: 0,
      speed: 0,
      ac: 0,
      hp: 0,
    };
    this.proficiencies = new Set(data.proficiencies);
  }

  getInitative() {
    return (
      this.getModifier(Ability.DEX) +
      this.specialBonus.initative +
      this.temporaryBonus.initative
    );
  }

  getSpeed() {
    return (
      this.speed + this.specialBonus.speed + this.temporaryBonus.speed
    );
  }

  getArmorClass() {
    // TODO(zain): Calculate this correctly.
    const equipmentBonus = 0;
    return (
      this.baseAC +
      equipmentBonus +
      this.specialBonus.ac +
      this.getModifier(Ability.DEX)
    );
  }

  getModifier(stat: Ability) {
    return Math.floor((this.ability[stat] - 10) / 2);
  }

  getSkillModifier(skill: Skill) {
    const base = this.getModifier(getSkillAbility(skill));
    const bonus = this.proficiencies.has(skill)
      ? this.proficiencyBonus
      : 0;
    return base + bonus;
  }

  serialize(): CharacterSheetDescriptor {
    return {
      id: this.id,
      name: this.name,
      race: this.race,
      subrace: this.subrace,
      classes: [...this.classes],
      baseAC: this.baseAC,
      speed: this.speed,
      proficiencyBonus: this.proficiencyBonus,
      ability: this.ability,
      specialBonus: this.specialBonus,
      proficiencies: Array.from(this.proficiencies),
    };
  }
}
