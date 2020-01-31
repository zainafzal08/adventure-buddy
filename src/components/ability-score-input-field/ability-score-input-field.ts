import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { Ability, abilityShorthand } from '../../data/CharacterSheet';

@customElement('ability-score-input-field')
export class AbilityScoreInputField extends connect(store)(LitElement) {
  private abilities = [
    Ability.STR,
    Ability.DEX,
    Ability.CON,
    Ability.INT,
    Ability.WIS,
    Ability.CHR,
  ];

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: fit-content;
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
        padding: 0 8px;
      }
      h3 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        opacity: 0.9;
        font-weight: 500;
        padding-left: 8px;
        margin-bottom: 8px;
      }
    `;
  }

  render() {
    return html`
      <h3>Ability Scores</h3>
      <div class="fields">
            ${this.abilities.map(
              ability => html`
                <div class="container">
                  <number-field
                    name=${abilityShorthand[ability]}
                    .range=${[1]}
                    reflect=${`characterDraft.abilityScores.${ability}`}
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
