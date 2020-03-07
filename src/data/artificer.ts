import lunr from 'lunr';
import { SPELLS, SpellDescription } from './spells';

/**
 * @fileoverview Definition of the artificer class, it injects data
 * on spells, classes, rules etc. and allows for any code to query the
 * database. Uses lunr and various internal tricks to maximise response
 * speed.
 */

function createSpellLunrIndex() {
  return lunr(function() {
    this.ref('id');
    this.field('name');
    this.field('range');
    this.field('components');
    this.field('duration');
    this.field('level');
    this.field('castingTime');
    this.field('school');
    this.field('description');
    this.field('classes');

    SPELLS.map(spell => {
      this.add(spell);
    });
  });
}

class Artificer {
  private spellsIndex: lunr.Index | null = null;

  init() {
    this.spellsIndex = createSpellLunrIndex();
  }

  searchSpells(query: string, exclude?: number[]) {
    // Query preprocess, forms a natural language query into one
    // the lunr will handle correctly.
    query = query.replace(/class:/g, 'classes:');
    query = query.replace(/\w+:$/g, '');
    query = query.replace(/(\w+):/g, '+$1:');

    /**
     * @todo Handle QueryParseError's luna throws.
     * @body index.search() with unknown fields i.e hello: causes errors
     * these should be caught and suppressed to not clog up the console.
     */
    const results = this.spellsIndex?.search(query);
    if (!results) return [];
    return results
      .map(x => parseInt(x.ref))
      .filter(x => !exclude?.includes(x)) as number[];
  }
}

let artificer: Artificer | null = null;

export async function initArtificer() {
  artificer = new Artificer();
  await artificer.init();
}

export function getArtificer() {
  return artificer!;
}
