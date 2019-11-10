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

type resolver = (value?: void | PromiseLike<void> | undefined) => void;

export class Database {
  /**
   * A promise that resolves when the database is finished initilisating
   */
  ready!:Promise<void>;
  
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
      })
  }

  async initialize() {
    const localDbVersion = parseInt(localStorage.get('db_version'));
    const remoteDbVersion = await this.getRemoteDbVersion();
    
    if (!localDbVersion || remoteDbVersion > localDbVersion) {
      // May be replaced with a smaller 'diff' download in future
      await this.clear();
      await this.downloadRemoteDb();
    }
  }

  /**
   * Querys the server to ask if the database has updated.
   * 
   */
  async getRemoteDbVersion() {
    //TODO(zain): Change this to query the actual server.
    return 1;
  }

  /**
   * Clears the indexDB
   */
  async clear() {
    //TODO(zain): this.
  }

  /**
   * Downloads the remote database down in json format and inserts it 
   * into the local indexdb.
   */
  async downloadRemoteDb() {
    //TODO(zain): Change this to query the actual server.
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

  /**
   * Returns all tables in the database with all of their enteries.
   */
  dump():Table[] {
    //TODO(zain): this
    return [];
  }
}
