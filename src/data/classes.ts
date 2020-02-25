export interface ClassDescriptor {
  name: string;
  tagline: string;
  icon: string;
}

export const CLASSES: { [k in string]: ClassDescriptor } = {
  barbarian: {
    name: 'Barbarian',
    icon: 'boxing-glove',
    tagline: 'All about getting angry and dealing damage.',
  },
  bard: {
    name: 'Bard',
    icon: 'music',
    tagline: 'Weaves magic through words and music.',
  },
  cleric: {
    name: 'Cleric',
    icon: 'hand-heart',
    tagline: 'A divine agent channeling the power of their god.',
  },
  druid: {
    name: 'Druid',
    icon: 'leaf',
    tagline: 'An embodiment of nature’s resilience, cunning, and fury',
  },
  fighter: {
    name: 'Fighter',
    icon: 'sword-cross',
    tagline: 'Possess a mastery with combat, armour and courage.',
  },
  monk: {
    name: 'Monk',
    icon: 'karate',
    tagline:
      "Perform's feats of martial arts with the power of their ki",
  },
  paladin: {
    name: 'Paladin',
    icon: 'shield-cross-outline',
    tagline: 'A divine champion guided by their oath to fight evil.',
  },
  ranger: {
    name: 'Ranger',
    icon: 'bullseye-arrow',
    tagline: 'A deadly hunter and a warriors of the wilderness.',
  },
  rogue: {
    name: 'Rogue',
    icon: 'knife-military',
    tagline: 'A Master of skill, stealth, and resourcefulness.',
  },
  sorcerer: {
    name: 'Sorcerer',
    icon: 'fire',
    tagline:
      'A powerful spellcaster who draws magic from their bloodline.',
  },
  warlock: {
    name: 'Warlock',
    icon: 'eye-circle-outline',
    tagline:
      'A mage drawing power from a pact with an otherworldly being.',
  },
  wizard: {
    name: 'Wizard',
    icon: 'auto-fix',
    tagline: 'Weavers of the arcane who draw their magic from study.',
  },
};
