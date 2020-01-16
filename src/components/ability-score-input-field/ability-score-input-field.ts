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
      p {
        margin: 0;
        margin-top: 4px;
        padding: 0;
        color: #bbb;
        width: 100%;
        text-align: center;
        font-size: 0.9rem;
        height: 1rem;
      }
      input {
        width: 100%;
        background: none;
        outline: none;
        border: none;
        border-bottom: 2px solid #ebebeb;
        text-align: center;
        font-size: 1.2rem;
        color: #444;
        padding-bottom: 4px;
        font-family: var(--font-stack);
      }
    `;
  }

  render() {
    return html`
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
    `;
  }
}
