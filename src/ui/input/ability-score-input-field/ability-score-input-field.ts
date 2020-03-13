import '../number-field/number-field';

import { html, customElement, css } from 'lit-element';
import {
  abilityShorthand,
  allAbilities,
  Ability,
} from '../../../data/ability';
import { AbilityScoresDeclaration } from '../../../data/CharacterSheet';
import { NumberField } from '../number-field/number-field';
import { all } from '../../../util';
import { BaseInput } from '../base-input';

@customElement('ability-score-input-field')
export class AbilityScoreInputField extends BaseInput<
  AbilityScoresDeclaration
> {
  // BaseInput Implementation:
  getValue(): AbilityScoresDeclaration {
    const scores: Partial<AbilityScoresDeclaration> = {};
    for (const a of allAbilities) {
      scores[a] = this.getValueForAbility(a);
    }
    return scores as AbilityScoresDeclaration;
  }

  setValue(scores: AbilityScoresDeclaration) {
    for (const a of allAbilities) {
      this.setValueForAbility(a, scores[a]);
    }
  }

  clearValue() {
    for (const a of allAbilities) {
      const input = this.shadowRoot?.getElementById(
        `new-character-ability-${a}`
      ) as NumberField;
      input.clear();
    }
  }

  valueValid() {
    return all(allAbilities.map(a => this.isValueValid(a)));
  }

  // AbilityScoreInputField Implementation:

  getValueForAbility(a: Ability): number {
    const input = this.shadowRoot?.getElementById(
      `new-character-ability-${a}`
    ) as NumberField;
    if (!input) return 10;
    return input.value;
  }

  setValueForAbility(a: Ability, v: number) {
    const input = this.shadowRoot?.getElementById(
      `new-character-ability-${a}`
    ) as NumberField;
    input.value = v;
  }

  isValueValid(a: Ability) {
    const input = this.shadowRoot?.getElementById(
      `new-character-ability-${a}`
    ) as NumberField;
    return input.isValid();
  }

  // LitElement Implementation:

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: fit-content;
        --num-scores: 6;
      }
      .fields {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
      }
      .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-sizing: border-box;
        width: calc(100% / var(--num-scores) - 12px);
      }
    `;
  }

  render() {
    return html`
      <div class="fields">
            ${allAbilities.map(
              ability => html`
                <div class="container">
                  <number-field
                    name=${abilityShorthand[ability]}
                    id=${`new-character-ability-${ability}`}
                    .inital=${10}
                    .start=${1}
                  ></number-field>
                </div>
              `
            )}
          </div>
        </h3>
      </h3>
    `;
  }
}
