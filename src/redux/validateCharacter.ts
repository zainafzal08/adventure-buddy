import { CharacterSheetDraft } from './characterDraft';
import { allAbilities } from '../data/CharacterSheet';

function all(a: Array<boolean>) {
  return a.reduce((acc, v) => acc && v, true);
}

function isNum(v: string) {
  return !isNaN(parseInt(v));
}

function isPosNum(v: string, includeZero: boolean = false) {
  if (includeZero) return isNum(v) && parseInt(v) >= 0;
  return isNum(v) && parseInt(v) > 0;
}

export function isValid(d: CharacterSheetDraft) {
  const basicValid =
    d.name !== undefined &&
    d.name.replace(/\s/g, '') !== '' &&
    d.race !== undefined &&
    d.subrace !== undefined &&
    d.classes.length >= 1;

  const abilityScoreValid = all(
    allAbilities.map(a => isPosNum(d.abilityScores[a]))
  );
  const basicStatsValid = all([
    isPosNum(d.maxHealth),
    isPosNum(d.hitDice.number),
    isPosNum(d.hitDice.type),
    isPosNum(d.ac),
    isPosNum(d.initiative, true),
    isPosNum(d.speed),
  ]);
  const additionalStatsValid = all([
    isPosNum(d.inspiration, true),
    isPosNum(d.profBonus, true),
    isPosNum(d.passiveWisdom),
    isPosNum(d.xp, true),
  ]);
  const savingThrowsValid = all(
    allAbilities.map(a => isNum(d.savingThrows[a].value))
  );

  return (
    basicValid &&
    abilityScoreValid &&
    basicStatsValid &&
    additionalStatsValid &&
    savingThrowsValid
  );
}
