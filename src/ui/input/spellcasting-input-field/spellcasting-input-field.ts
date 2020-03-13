import '../selection-field/selection-field';
import '../spell-input/spell-input';

import { css, customElement, html } from 'lit-element';
import { NumberField } from '../number-field/number-field';
import { SpellCastingDeclaration } from '../../../data/CharacterSheet';
import { Ability, allAbilities } from '../../../data/ability';
import { range } from '../../../util';
import { BaseInput } from '../base-input';

@customElement('spellcasting-input-field')
export class SpellcastingInputField extends BaseInput<
  SpellCastingDeclaration
> {
  // BaseInput Implementation:
  getValue(): SpellCastingDeclaration {
    // TODO
    return {
      slots: {
        1: {
          count: 3,
          max: 3,
        },
      },
      maxPrepared: 0,
      prepared: [],
      known: [],
      ability: Ability.WIS,
    };
  }

  setValue(spellcasting: SpellCastingDeclaration) {
    // TODO
  }

  clearValue() {
    // TODO
  }

  validValue() {
    // TODO
  }

  // SpellcastingInputField Implementation:
  generateValues() {
    // TODO
  }

  autofill() {
    // TODO
  }

  autofillImpossible() {
    // TODO
    return false;
  }

  private getNumberValue(id: string): number {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    return field.value;
  }

  private setNumberValue(id: string, value: number) {
    const field = this.shadowRoot?.getElementById(
      `new-character-${id}`
    )! as NumberField;
    field.value = value;
  }

  isNumberValValid(id: string) {
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
      .row:first-child {
        margin-bottom: 48px;
        margin-top: 32px;
      }
      .row * {
        width: calc(100% / 3 - 12px);
      }
    `;
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
          id="new-character-max-prepared"
          name="Max Prepared Spells"
        ></number-field>
        <number-field
          id="new-character-max-cantrips"
          name="Max Known Cantrips"
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
      <spell-input id="new-character-known-spells"></spell-input>
    `;
  }
}
