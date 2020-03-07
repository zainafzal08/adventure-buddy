import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import {
  abilityShorthand,
  allAbilities,
  Ability,
} from '../../../data/ability';
import { AbilityScoresDeclaration } from '../../../data/CharacterSheet';
import { NumberField } from '../number-field/number-field';
import { all } from '../../../util';

@customElement('ability-score-input-field')
export class AbilityScoreInputField extends LitElement {
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

  get value(): AbilityScoresDeclaration {
    const scores: Partial<AbilityScoresDeclaration> = {};
    for (const a of allAbilities) {
      scores[a] = this.getValueForAbility(a);
    }
    return scores as AbilityScoresDeclaration;
  }

  set value(scores: AbilityScoresDeclaration) {
    for (const a of allAbilities) {
      this.setValueForAbility(a, scores[a]);
    }
  }

  clear() {
    for (const a of allAbilities) {
      const input = this.shadowRoot?.getElementById(
        `new-character-ability-${a}`
      ) as NumberField;
      input.clear();
    }
  }

  isValueValid(a: Ability) {
    const input = this.shadowRoot?.getElementById(
      `new-character-ability-${a}`
    ) as NumberField;
    return input.isValid();
  }

  isValid() {
    return all(allAbilities.map(a => this.isValueValid(a)));
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
