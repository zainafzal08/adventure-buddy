import * as RACES_STRICT from '../assets/races.json';
import * as CLASSES_STRICT from '../assets/classes.json';

export interface ClassDescriptor {
  name: string;
  tagline: string;
  icon: string;
}

const RACES: { [x in string]: Race } = RACES_STRICT;
delete RACES['default'];
const CLASSES: { [x in string]: ClassDescriptor } = CLASSES_STRICT;
delete CLASSES['default'];

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

export class Database {
  private races = RACES;
  private raceList = Object.keys(RACES);
  private classes = CLASSES;

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
  allClasses() {
    return Object.entries(this.classes);
  }
}

const database = new Database();

export function getDatabase(): Database {
  return database;
}
