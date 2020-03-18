import '../selection-field/selection-field';
import '../spell-input/spell-input';

import { css, customElement, html, query } from 'lit-element';
import { NumberField } from '../number-field/number-field';
import {
  SpellCastingDeclaration,
  AbilityScoresDeclaration,
} from '../../../data/CharacterSheet';
import {
  Ability,
  allAbilities,
  getModifier,
} from '../../../data/ability';
import { range, all } from '../../../util';
import { BaseInput } from '../base-input';
import { SpellInput } from '../spell-input/spell-input';
import { mdiPencil } from '@mdi/js';
import knownSpells from '../../../assets/humaaans/knownSpells.svg';
import { SPELLS } from '../../../data/spells';
import { SelectionField } from '../selection-field/selection-field';

function setEqual(a: number[], b: number[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size !== setB.size) return false;
  for (const e of setA) {
    if (!setB.has(e)) return false;
  }
  return true;
}

@customElement('spellcasting-input-field')
export class SpellcastingInputField extends BaseInput<
  SpellCastingDeclaration
> {
  @query('spell-input') spellInput!: SpellInput;
  @query('selection-field') spellAbility!: SelectionField;

  // BaseInput Implementation:
  getValue(): SpellCastingDeclaration {
    const slots = range(1, 9).map(l => {
      const v = this.getNumberValue(`level-${l}-spell-slots`);
      return { count: v, max: v };
    });
    return {
      slots,
      maxAvailable: this.getNumberValue('max-available'),
      available: this.spellInput?.value,
      ability: this.spellAbility?.value as Ability,
      spellAttack: this.getNumberValue('spell-attack'),
      spellSaveDC: this.getNumberValue('spell-save-dc'),
    };
  }

  setValue(spellcasting: SpellCastingDeclaration) {
    for (const l of range(0, 8)) {
      const max = spellcasting.slots[l].max;
      this.setNumberValue(`level-${l + 1}-spell-slots`, max);
    }
    this.setNumberValue(`max-available`, spellcasting.maxAvailable);
    this.setNumberValue(`spell-attack`, spellcasting.spellAttack);
    this.setNumberValue(`spell-save-dc`, spellcasting.spellSaveDC);
    this.spellInput.value = spellcasting.available;
    this.spellAbility.value = spellcasting.ability;
  }

  clearValue() {
    for (const l of range(1, 9)) {
      this.clearNumberValue(`level-${l}-spell-slots`);
    }
    this.clearNumberValue(`max-available`);
    this.clearNumberValue(`spell-attack`);
    this.clearNumberValue(`spell-save-dc`);
    this.spellInput.clear();
    this.spellAbility.clear();
  }

  validValue() {
    return all([
      ...range(1, 9).map(l =>
        this.isNumberValValid(`level-${l}-spell-slots`)
      ),
      this.isNumberValValid('spell-attack'),
      this.isNumberValValid('spell-save-dc'),
      this.isNumberValValid('max-available'),
      this.spellInput.isValid(),
      this.spellAbility.isValid(),
    ]);
  }

  // SpellcastingInputField Implementation:
  generateValues(
    abilityScores: AbilityScoresDeclaration,
    profBonus: number
  ) {
    if (!this.value.ability) return this.value;
    const spellAbility = this.value.ability.toLowerCase() as Ability;
    const abilityBonus = getModifier(abilityScores[spellAbility]);
    return {
      ...this.value,
      spellAttack: profBonus + abilityBonus,
      spellSaveDC: 8 + profBonus + abilityBonus,
    };
  }

  autofill(abilityScores: AbilityScoresDeclaration, profBonus: number) {
    this.value = this.generateValues(abilityScores, profBonus);
  }

  autofillImpossible(
    abilityScores: AbilityScoresDeclaration,
    profBonus: number
  ) {
    const gen = this.generateValues(abilityScores, profBonus);
    const abilitySame = gen.ability === this.value.ability;
    const maxAvailableSame =
      gen.maxAvailable === this.value.maxAvailable;
    const spellSaveSame = gen.spellSaveDC === this.value.spellSaveDC;
    const spellAttackSame = gen.spellAttack === this.value.spellAttack;
    const spellsSame = setEqual(gen.available, this.value.available);
    // Assumes both gen + value have same # levels in slots...
    const slotsSame = this.value.slots.map(
      (v, l) => v === gen.slots[l]
    );

    return (
      slotsSame &&
      spellsSame &&
      abilitySame &&
      maxAvailableSame &&
      spellSaveSame &&
      spellAttackSame
    );
  }

  private getNumberValue(id: string): number {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    if (!field) return 0;
    return field.value;
  }

  private setNumberValue(id: string, value: number) {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    field.value = value;
  }

  private clearNumberValue(id: string) {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    field.clear();
  }

  private isNumberValValid(id: string) {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    return field.isValid();
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 16px;
      }
      .row {
        margin-bottom: 48px;
      }
      .row * {
        width: calc(100% / 2 - 12px);
      }
      .row:first-child {
        margin-top: 32px;
        margin-bottom: 8px;
      }
      .row:first-child * {
        width: calc(100% / 3 - 12px);
      }
      .heading {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      h3 {
        color: #999;
        font-size: 16px;
        margin: 0;
        padding: 0;
        margin-right: 8px;
      }
      .btn {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        height: 26px;
        width: 26px;
        margin-bottom: 2px;
      }
      .btn:hover {
        background: #ebebeb;
      }
      .spell-list {
        width: 100%;
        display: flex;
        margin-top: 12px;
        flex-wrap: wrap;
      }
      .spell-list img {
        height: 200px;
        margin-top: 35px;
      }
      .spell-list .chip {
        padding: 2px 12px;
        border: 2px solid #888;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #777;
        font-size: 14px;
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `;
  }

  spellListZeroState() {
    return html`
      <img src=${knownSpells} />
    `;
  }

  renderSpellChip(s: number) {
    const spellName = SPELLS[s].name;
    return html`
      <div class="chip">${spellName}</div>
    `;
  }

  renderSpellList() {
    if (!this.spellInput) return null;
    if (this.spellInput.value.length === 0) {
      return this.spellListZeroState();
    }
    return this.spellInput.value.map(s => this.renderSpellChip(s));
  }

  render() {
    return html`
      <div class="row">
        <selection-field
          name="Spellcasting Ability"
          id="new-character-spellcasting-ability"
          .options=${allAbilities.map(
            x => x[0].toUpperCase() + x.substring(1)
          )}
        ></selection-field>
        <number-field
          id="new-character-max-available"
          name="Max Known/Prepared Spells"
          .start=${0}
        ></number-field>
        <number-field
          id="new-character-max-cantrips"
          name="Max Known Cantrips"
          .start=${0}
        ></number-field>
      </div>
      <div class="row">
        <number-field
          id="new-character-spell-save-dc"
          name="Spell Save DC"
          .initial=${8}
        ></number-field>
        <number-field
          id="new-character-spell-attack"
          name="Spell Attack"
          .initial=${0}
        ></number-field>
      </div>

      ${range(0, 2).map(
        row => html`
          <div class="row slots">
            ${range(1 + row * 3, 3 + row * 3).map(
              level => html`
                <number-field
                  id="new-character-level-${level}-spell-slots"
                  name=${`Level ${level} Spell Slots`}
                ></number-field>
              `
            )}
          </div>
        `
      )}
      <div class="heading">
        <h3>Prepared / Known Spells</h3>
        <div class="btn" @click=${() => this.spellInput.show()}>
          <mdi-icon
            color="#777"
            icon=${mdiPencil}
            size=${16}
          ></mdi-icon>
        </div>
      </div>
      <div class="spell-list">
        ${this.renderSpellList()}
      </div>
      <spell-input
        @input-loaded=${() => this.requestUpdate()}
        @value-updated=${() => this.requestUpdate()}
        id="new-character-known-spells"
      ></spell-input>
    `;
  }
}
