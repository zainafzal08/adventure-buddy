import '../number-field/number-field';
import '../dice-input/dice-input';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';

@customElement('basic-stats-input-field')
export class BasicStatsInputField extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .fields {
        width: 100%;
        display: flex;
        justify-content: flex-start;
      }
      .container-med {
        width: 20%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
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
        margin-top: 8px;
      }
    `;
  }

  render() {
    return html`
      <h3>Basic Stats</h3>
      <div class="fields">
        <div class="container-med">
          <number-field
            name="Max Health"
            .range=${[1]}
            reflect="characterDraft.maxHealth"
          ></number-field>
        </div>
        <div class="container-med">
          <dice-input
            name="Hit Dice"
            reflect="characterDraft.hitDice"
          ></dice-input>
        </div>
        <div class="container-med">
          <number-field
            name="AC"
            .range=${[1]}
            reflect="characterDraft.ac"
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            name="Initiative"
            .range=${[0]}
            reflect="characterDraft.initiative"
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            name="Speed"
            .range=${[1]}
            reflect="characterDraft.speed"
          ></number-field>
        </div>
      </div>
    `;
  }
}
