import '../attack-input-card/attack-input-card';

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
import { AttackDescriptor } from '../../../redux/characterDraft';

@customElement('attacks-input-field')
export class AttacksInputField extends connect(store)(LitElement) {
  @property() private attacks: AttackDescriptor[] = [];

  stateChanged(state: AppState) {
    this.attacks = state.characterDraft.attacks;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      h3 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        opacity: 0.9;
        font-weight: 500;
        margin-bottom: 16px;
      }
      .grid {
        width: 100%;
        flex-grow: 1;
        display: flex;
        overflow-y: auto;
      }
    `;
  }

  render() {
    return html`
      <h3>Attacks</h3>
      <div class="grid">
        <attack-input-card></attack-input-card>
      </div>
    `;
  }
}
