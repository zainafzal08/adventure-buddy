import '../mdi-icon/mdi-icon';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import { CharacterSheetDraft } from '../../redux/characterDraft';
import { generateDescriptor } from '../../data/CharacterSheet';
import * as mdiAll from '@mdi/js';
import { getDatabase } from '../../data/Database';

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
      </div>
    `;
  }
}
