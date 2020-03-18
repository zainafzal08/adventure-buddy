export enum DamageType {
  ACID = 'acid',
  BLUDGEONING = 'bludgeoning',
  COLD = 'cold',
  FIRE = 'fire',
  FORCE = 'force',
  LIGHTNING = 'lightning',
  NECROTIC = 'necrotic',
  PIERCING = 'piercing',
  POISON = 'poison',
  PSYCHIC = 'psychic',
  RADIANT = 'radiant',
  SLASHING = 'slashing',
  THUNDER = 'thunder',
}

export interface AttackDamage {
  type: DamageType;
  formula: string;
}

export interface RangedFeature {
  name: 'ranged' | 'thrown';
  range: {
    normal: number;
    long: number;
  };
}

export interface ModifierFeature {
  name: 'finesse' | 'heavy' | 'light' | 'loading';
}

export interface UseFeature {
  name: 'two-handed' | 'versatile' | 'reach';
}

export type AttackFeature =
  | RangedFeature
  | ModifierFeature
  | UseFeature;

export interface AttackDescriptor {
  name: string;
  skillLevel: 'martial' | 'simple';
  type: 'ranged' | 'melee';
  features: AttackFeature[];
  toHit: string;
  ammo: number | null;
  range: {
    normal: number;
    long: number;
  };
  damage: AttackDamage[];
}
