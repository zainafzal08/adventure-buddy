import { html, customElement, css } from 'lit-element';

import { AsyncElement } from '../../AsyncElement';
import { getLogoutEvent } from '../../util';

@customElement('app-home')
export class AppHome extends AsyncElement {
  static get styles() {
    return css``;
  }

  logout() {
    this.dispatchEvent(getLogoutEvent());
  }

  template() {
    return html`
      <p>Welcome Home</p>
      <button @click=${this.logout}>log out</button>
    `;
  }
}
