import icons from 'assets/icons/*.svg';
import * as localForage from "localforage";
import { uuid } from 'uuidv4';

// TODO(zain): update to new topic syste,
export type Topic =
  | "spells"
  | "equipment"
  | "combat"
  | "magic"
  | "features"
  | "movement"
  | "resting"
  | "enviornment"
  | "death"
  | "effects";

export interface Table {
  name: Topic;
  headings: string[];
  rows: SearchResult[];
}

export interface SearchOptions {
  include?: Topic[];
  exclude?: Topic[];
}

export interface SearchResult {
  cols: string[];
  matches: Match[];
}

export interface Match {
  field: number;
  start: number;
  end: number;
}

export interface CharacterSheetDescriptor {
  id: string|null;
  name: string;
  race: string;
  class: string;
  level: number;
}

export class CharacterSheetData {
  id: string = '0';
  name: string = '';
  race: string = '';
  class: string = '';
  level: number = 1;

  constructor (data:CharacterSheetDescriptor) {
    if (!data.id) {
      throw Error('Provided Id must be Non-null');
    }
    this.id = data.id;
    this.name = data.name;
    this.race = data.race;
    this.class = data.class;
    this.level = data.level;
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
  READY  
}

type resolver = (value?: void | PromiseLike<void> | undefined) => void;

export class Database {
  /**
   * A promise that resolves when the database is finished initilisating
   */
  ready!:Promise<void>;
  
  /**
   * The state of the database
   */
  state:DatabaseState = DatabaseState.LOADING;

  /**
   * A function that resolves the ready promise, should be called when
   * the database has finished init.
   */
  private readyPromiseResolver!:resolver;
  
  constructor() {
    this.ready = new Promise((resolve) => {
      this.readyPromiseResolver = resolve;
    })
    this.initialize()
      .then(() => {
        this.readyPromiseResolver();
        this.state = DatabaseState.READY;
      })
  }

  async initialize() {
    const characters = await localForage.getItem('meta:characters');
    if (!characters) {
      await localForage.setItem('meta:characters', []);
    }
  }

  /** Convience Method for extracting a character from localForage */
  async fetchCharacter(id:string):Promise<CharacterSheetData> {
    const data = await localForage.getItem(`character:${id}`);
    const descriptor = data as CharacterSheetDescriptor;
    if (!descriptor) return null;
    return new CharacterSheetData(descriptor);
  }

  /** Convience Method for adding metadata */
  async appendToMeta(key:string, value:string) {
    const array = await localForage
      .getItem(`meta:${key}`)as Array<string>;
    await localForage.setItem(`meta:${key}`, [...array, value]);
  }

  /** Get's all characters for the current user. */
  async getAllCharacters():Promise<CharacterSheetData[]> {
    const allCharacterIds = await localForage
      .getItem(`meta:characters`) as Array<string>;

    const allCharacters = [];
    for (const id of allCharacterIds) {
      allCharacters.push(await this.fetchCharacter(id));
    }
    return allCharacters;
  }

  /** Get's a character sheet by id. */
  async getCharacterSheet(id: string):Promise<CharacterSheetData|null> {
    return await this.fetchCharacter(id);
  }

  /** Create a new character. */
  async createCharacterSheet(descriptor:CharacterSheetDescriptor) {
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
  
  /**
   * Takes a string and searches the database for all enteries which 
   * match. Can take a optional secondary options argument which 
   * specifies a more narrow search query.
   */
  search(searchText: string, options?: SearchOptions):Table[] {
    //TODO(zain): this
    return [];
  }

}

const database = new Database();

export function getDatabase():Database {
  return database;
}