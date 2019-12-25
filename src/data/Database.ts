import * as localForage from 'localforage';
import { uuid } from 'uuidv4';
import {
  CharacterSheet,
  CharacterSheetDescriptor,
} from './CharacterSheet';
import * as RACES_STRICT from '../assets/races.json';
import * as CLASSES_STRICT from '../assets/classes.json';

export enum DatabaseState {
  LOADING,
  READY,
}

const RACES: { [x in string]: Race } = RACES_STRICT;
delete RACES['default'];
const CLASSES: { [x in string]: CharacterClass } = CLASSES_STRICT;
delete RACES['default'];
delete CLASSES['default'];

type resolver = (value?: void | PromiseLike<void> | undefined) => void;

interface Feature {
  fullName: string;
  desc: string;
  icon: string;
  link?: boolean;
}

interface SubRace {
  fullName: string;
  tagline: string;
  features: Feature[];
}

interface Race {
  name: string;
  tagline: string;
  physical: {
    height: string;
    size: string;
    speed: string;
  };
  subraces: { [x in string]: SubRace };
  features: Feature[];
}

interface CharacterClass {
  name: string;
  icon: string;
}

export interface Settings {
  theme: string;
}

function defaultSettings(): Settings {
  return {
    theme: 'peach',
  };
}

export class Database {
  /** A promise that resolves when the database is finished initilisating. */
  ready!: Promise<void>;

  /** The state of the database */
  state: DatabaseState = DatabaseState.LOADING;

  /**
   * A function that resolves the ready promise, should be called when
   * the database has finished init.
   */
  private readyPromiseResolver!: resolver;

  /** Currently logged in user. */
  private user: firebase.UserInfo | null = null;

  private races = RACES;
  private raceList = Object.keys(RACES);
  private classes = CLASSES;
  private settingListners: ((newSettings: Settings) => void)[] = [];

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

  async login(user: firebase.User) {
    this.user = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
    };

    await localForage.setItem('user', this.user);
  }

  async logout() {
    this.user = null;
    await localForage.setItem('user', null);
  }

  async getUser(): Promise<firebase.UserInfo | null> {
    if (this.user) return this.user;
    return (await localForage.getItem('user')) as firebase.UserInfo;
  }

  getRace(id: string) {
    return this.races[id];
  }

  getSubRace(raceId: string, subraceId: string) {
    return this.races[raceId].subraces[subraceId];
  }

  getRaceIdFromIndex(index: number) {
    return this.raceList[index];
  }

  getSubRaceIdFromIndex(race: string, index: number) {
    return Object.keys(this.races[race].subraces)[index];
  }

  getAllRaces() {
    return Object.entries(this.races);
  }

  getAllSubRaces(race: string) {
    return Object.entries(this.races[race].subraces);
  }

  getClass(characterClass: string) {
    return this.classes[characterClass];
  }

  async getSettings(): Promise<Settings> {
    let settings = await localForage.getItem('settings');
    if (settings === null) {
      settings = defaultSettings();
      this.updateSettings(settings);
    }
    return settings as Settings;
  }

  async updateSettings(settings: Settings) {
    await localForage.setItem('settings', settings);
    this.settingListners.map(callback => {
      callback(settings);
    });
  }

  addSettingsListener(callback: (newSettings: Settings) => void) {
    this.settingListners.push(callback);
  }
  /** Convience method for adding to a metadata array. */
  async appendToMeta(key: string, value: string) {
    const array = (await localForage.getItem(`meta:${key}`)) as Array<
      string
    >;
    await localForage.setItem(`meta:${key}`, [...array, value]);
  }

  /** Convience Method for getting metadata. */
  async getMetadata(key: string) {
    return (await localForage.getItem(`meta:${key}`)) as Array<string>;
  }

  /** Get's number of characters. */
  async numCharacters(): Promise<number> {
    const characters = await this.getMetadata('characters');
    return characters.length;
  }

  /** Get's all characters for the current user. */
  async getAllCharacters(): Promise<CharacterSheet[]> {
    const allCharacterIds = (await localForage.getItem(
      `meta:characters`
    )) as Array<string>;

    const allCharacters = [];
    for (const id of allCharacterIds) {
      const character = await this.getCharacterSheet(id);
      allCharacters.push(character!);
    }

    return allCharacters;
  }

  /** Get's a character sheet by id. */
  async getCharacterSheet(id: string): Promise<CharacterSheet | null> {
    const data = await localForage.getItem(`character:${id}`);
    // TODO(zain): we need a server request here to grab a character not
    // in local storage. On failed request we can error (this is how
    // offline will work).
    if (!data) return null;
    return new CharacterSheet(data as CharacterSheetDescriptor);
  }

  /** Create a new character. */
  async createCharacterSheet(descriptor: CharacterSheetDescriptor) {
    if (!descriptor.id) {
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
