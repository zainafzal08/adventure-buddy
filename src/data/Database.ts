import * as localForage from 'localforage';
import { uuid } from 'uuidv4';
import {
  CharacterSheet,
  CharacterSheetDescriptor,
} from './CharacterSheet';

export enum DatabaseState {
  LOADING,
  READY,
}

type resolver = (value?: void | PromiseLike<void> | undefined) => void;

export class Database {
  /**
   * A promise that resolves when the database is finished initilisating.
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

  /**
   * Currently logged in user.
   */
  private user: firebase.UserInfo | null = null;

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
