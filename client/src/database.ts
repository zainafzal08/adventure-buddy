import icons from 'assets/icons/*.svg';
import * as localForage from 'localforage';
import { uuid } from 'uuidv4';

// TODO(zain): Make this a enum.
export type Ability =
  | 'str'
  | 'dex'
  | 'con'
  | 'int'
  | 'wis'
  | 'chr'
  | 'spd'
  | 'ac'
  | 'prf';

export interface BaseStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  chr: number;
  spd: number;
  ac: number;
  prf: number;
}

export interface SpecialBonus {
  initative: number;
  speed: number;
  ac: number;
}

export interface CharacterSheetDescriptor {
  id: string | null;
  name: string;
  race: string;
  class: string;
  level: number;
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

export function getAbilityDisplayName(ability: Ability) {
  switch (ability) {
    case 'str':
      return 'Strength';
    case 'dex':
      return 'Dexterity';
    case 'con':
      return 'Constitution';
    case 'int':
      return 'Intelligence';
    case 'wis':
      return 'Wisdom';
    case 'chr':
      return 'Charisma';
    case 'spd':
      return 'Speed';
    case 'ac':
      return 'Armour Class';
    case 'prf':
      return 'Proficiency Modifier';
  }
}

export function getSkillAbility(skill: Skill) {
  switch (skill) {
    case Skill.ATHLETICS:
      return 'str';
    case Skill.ACROBATICS:
      return 'dex';
    case Skill.SLEIGHT_OF_HAND:
      return 'dex';
    case Skill.STEALTH:
      return 'dex';
    case Skill.ARCANA:
      return 'int';
    case Skill.HISTORY:
      return 'int';
    case Skill.INVESTIGATION:
      return 'int';
    case Skill.NATURE:
      return 'int';
    case Skill.RELIGION:
      return 'int';
    case Skill.ANIMAL_HANDLING:
      return 'wis';
    case Skill.INSIGHT:
      return 'wis';
    case Skill.MEDICINE:
      return 'wis';
    case Skill.PERCEPTION:
      return 'wis';
    case Skill.SURVIVAL:
      return 'wis';
    case Skill.DECEPTION:
      return 'chr';
    case Skill.INTIMIDATION:
      return 'chr';
    case Skill.PERFORMANCE:
      return 'chr';
    case Skill.PERSUASION:
      return 'chr';
    default:
      return `UNKNOWN SKILL ${skill} ${Skill.ATHLETICS}`;
  }
}

export class CharacterSheetData {
  id!: string;
  name!: string;
  race!: string;
  class!: string;
  level!: number;
  ability!: BaseStats;
  proficiency!: object;
  specialBonus: SpecialBonus;
  temporaryBonus: SpecialBonus;
  // Proficiency in a ability means +prof bonus on saving throws.
  proficiencies!: Set<Skill | Ability>;
  inspiration: number;

  constructor(data: CharacterSheetDescriptor) {
    if (!data.id) {
      throw Error('Provided Id must be Non-null');
    }
    this.id = data.id;
    this.name = data.name;
    this.race = data.race;
    this.class = data.class;
    this.level = data.level;
    this.ability = data.ability;
    this.inspiration = 0;
    this.specialBonus = {
      initative: 0,
      speed: 0,
      ac: 0,
      ...data.specialBonus,
    };
    this.temporaryBonus = {
      initative: 0,
      speed: 0,
      ac: 0,
    };
    this.proficiencies = new Set(data.proficiencies);
  }

  getInitative() {
    return (
      this.getModifier('dex') +
      this.specialBonus.initative +
      this.temporaryBonus.initative
    );
  }

  getSpeed() {
    return (
      this.ability['spd'] +
      this.specialBonus.speed +
      this.temporaryBonus.speed
    );
  }

  getArmorClass() {
    // TODO(zain): Calculate this correctly.
    const equipmentBonus = 0;
    return (
      this.ability['ac'] +
      equipmentBonus +
      this.specialBonus.ac +
      this.getModifier('dex')
    );
  }

  getModifier(stat: Ability) {
    return Math.floor((this.ability[stat] - 10) / 2);
  }

  getSkillModifier(skill: Skill) {
    const base = this.getModifier(getSkillAbility(skill));
    const bonus = this.proficiencies.has(skill)
      ? this.ability['prf']
      : 0;
    return base + bonus;
  }

  getDescriptor() {
    return `Level ${this.level} ${this.race} ${this.class}`;
  }

  getIcon() {
    return icons[this.class];
  }
}

export enum DatabaseState {
  LOADING,
  READY,
}

type resolver = (value?: void | PromiseLike<void> | undefined) => void;

export class Database {
  /**
   * A promise that resolves when the database is finished initilisating
   */
  ready!: Promise<void>;

  /**
   * The state of the database
   */
  state: DatabaseState = DatabaseState.LOADING;

  /**
   * A function that resolves the ready promise, should be called when
   * the database has finished init.
   */
  private readyPromiseResolver!: resolver;

  constructor() {
    this.ready = new Promise(resolve => {
      this.readyPromiseResolver = resolve;
    });
    this.initialize().then(() => {
      this.readyPromiseResolver();
      this.state = DatabaseState.READY;
    });
  }

  async initialize() {
    const characters = await localForage.getItem('meta:characters');
    if (!characters) {
      await localForage.setItem('meta:characters', []);
    }
  }

  /** Convience Method for extracting a character from localForage */
  async fetchCharacter(id: string): Promise<CharacterSheetData | null> {
    const data = await localForage.getItem(`character:${id}`);
    const descriptor = data as CharacterSheetDescriptor;
    if (!descriptor) return null;

    return new CharacterSheetData(descriptor);
  }

  /** Convience Method for adding metadata */
  async appendToMeta(key: string, value: string) {
    const array = (await localForage.getItem(`meta:${key}`)) as Array<
      string
    >;
    await localForage.setItem(`meta:${key}`, [...array, value]);
  }

  /** Convience Method for getting metadata */
  async getMetadata(key: string) {
    return (await localForage.getItem(`meta:${key}`)) as Array<string>;
  }

  /** Get's number of characters */
  async numCharacters(): Promise<number> {
    const characters = await this.getMetadata('characters');
    return characters.length;
  }

  /** Get's all characters for the current user. */
  async getAllCharacters(): Promise<CharacterSheetData[]> {
    const allCharacterIds = (await localForage.getItem(
      `meta:characters`
    )) as Array<string>;

    const allCharacters = [];
    for (const id of allCharacterIds) {
      const character = await this.fetchCharacter(id);
      allCharacters.push(character!);
    }

    return allCharacters;
  }

  /** Get's a character sheet by id. */
  async getCharacterSheet(
    id: string
  ): Promise<CharacterSheetData | null> {
    return await this.fetchCharacter(id);
  }

  /** Create a new character. */
  async createCharacterSheet(descriptor: CharacterSheetDescriptor) {
    if (descriptor.id === null) {
      descriptor.id = uuid();
    }
    this.appendToMeta('characters', descriptor.id);
    await localForage.setItem(`character:${descriptor.id}`, descriptor);
    return descriptor.id;
  }

  /** Clear the database. */
  async clear() {
    await localForage.clear();
  }
}

const database = new Database();

export function getDatabase(): Database {
  return database;
}
