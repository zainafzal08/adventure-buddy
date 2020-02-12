import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';
import { AppState } from '../../../redux/reducer';

@customElement('attacks-input-field')
export class AttacksInputField extends connect(store)(LitElement) {
  stateChanged(state: AppState) {}

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        background: red;
      }
    `;
  }

  render() {
    return html``;
  }
}
