import { exhaustiveCheck } from '../util';
import { Ability } from './ability';

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
