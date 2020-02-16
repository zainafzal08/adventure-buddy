import '../mdi-icon/mdi-icon';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';
import { AppState } from '../../../redux/reducer';
import { CharacterSheetDraft } from '../../../redux/characterDraft';
import {
  generateDescriptor,
  allAbilities,
  abilityShorthand,
  toModifier,
} from '../../../data/CharacterSheet';
import * as mdiAll from '@mdi/js';
import { getDatabase } from '../../../data/Database';

@customElement('character-card')
export class CharacterCard extends connect(store)(LitElement) {
  @property() character!: CharacterSheetDraft;

  stateChanged(state: AppState) {
    this.character = state.characterDraft;
  }

  static get styles() {
    return css`
      :host {
        --class-item-size: 24px;
        width: 450px;
        height: 600px;
        box-sizing: border-box;
        padding: 32px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
      h1,
      h4 {
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: left;
        width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      h1 {
        font-size: 1.4rem;
        height: 1.5rem;
        color: #444;
      }
      h4 {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        height: 1.1rem;
        color: #bbb;
      }
      h1:empty {
        background: #f2f2f2;
      }
      .row {
        width: 100%;
        display: flex;
        min-height: calc(24px + 0.7rem);
      }
      .col {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .placeholder-class {
        width: 24px;
        height: 24px;
        margin-top: 0.7rem;
        background: #ebebeb;
        border-radius: 50%;
      }
      .selected-class {
        width: 24px;
        height: 24px;
        margin-top: 0.7rem;
        background: var(--theme-gradient);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
      }
      .selected-class mdi-icon {
        opacity: 0.6;
      }
      .ability-score {
        margin-right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #777;
      }
      .ability-score .score {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 1.2rem;
        min-height: 1.2rem;
        opacity: 0.7;
      }
      .ability-score .name {
        margin: 0;
        padding: 0;
        color: #999;
        margin-top: 8px;
        font-size: 0.8rem;
      }
      .abilities {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 16px;
      }
      .stat-container {
        display: flex;
        align-items: center;
        margin: 24px 0;
      }
      .stat-container p {
        margin: 0;
        padding: 0;
        color: #777;
        padding-left: 8px;
      }
      .health-bar {
        width: 100%;
        height: 8px;
        background: var(--theme-primary);
        border-radius: 15px;
        margin: 24px 0 8px 0;
      }
      .bar-label {
        width: 100%;
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 0.9rem;
        color: #999;
      }
      .space-out {
        justify-content: space-between;
      }
    `;
  }

  getIcon(icon: string) {
    // Captilize.
    let iconStr = icon.substr(0, 1).toUpperCase() + icon.substr(1);
    // To camelcase.
    iconStr = iconStr.replace(/\-\w/g, (match: string) => {
      return match.replace('-', '').toUpperCase();
    });
    return (mdiAll as { [k in string]: string })[`mdi${iconStr}`];
  }

  getColor(score: string) {
    const val = isNaN(parseInt(score)) ? 10 : parseInt(score);
    const mod = toModifier(val);
    if (mod < 0) {
      return css`var(--theme-emphasis-low)`;
    } else if (mod > 0) {
      return css`var(--theme-emphasis-high)`;
    }
    return css`var(--neutral)`;
  }

  renderAbilities() {
    return html`
      <div class="abilities">
        ${allAbilities.map(
          a => html`
            <div class="ability-score">
              <p
                class="score"
                style=${`color: ${this.getColor(
                  this.character.abilityScores[a]
                )}`}
              >
                ${this.character.abilityScores[a]}
              </p>
              <p class="name">${abilityShorthand[a]}</p>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    const db = getDatabase();
    return html`
      <h1>${this.character.name}</h1>
      <h4>${generateDescriptor(this.character)}</h4>
      <div class="row">
        ${this.character.classes.map(
          c => html`
            <div class="selected-class">
              <mdi-icon
                size="14"
                color="rgba(255, 255, 255, 1)"
                icon=${this.getIcon(db.getClass(c.id).icon)}
              ></mdi-icon>
            </div>
          `
        )}
        ${this.character.classes.length === 0
          ? html`
              <div class="placeholder-class"></div>
            `
          : null}
      </div>
      <p>
        OTHER INFO HERE
      </p>
    `;
  }
}
