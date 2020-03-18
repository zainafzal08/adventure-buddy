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

export const abilityShorthand = {
  [Ability.STR]: 'Str',
  [Ability.DEX]: 'Dex',
  [Ability.CON]: 'Con',
  [Ability.INT]: 'Int',
  [Ability.WIS]: 'Wis',
  [Ability.CHR]: 'Chr',
};

export function getModifier(value: number) {
  return Math.floor((value - 10) / 2);
}
