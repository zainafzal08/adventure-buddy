import { html, customElement, css } from 'lit-element';

import { AsyncElement } from '../../AsyncElement';
import { getLogoutEvent } from '../../util';
import { getDatabase } from '../../data/Database';

@customElement('app-home')
export class AppHome extends AsyncElement {
  private user: firebase.User | null = null;

  static get styles() {
    return css``;
  }

  async init() {
    this.user = await getDatabase().getUser();
  }

  logout() {
    this.dispatchEvent(getLogoutEvent());
  }

  template() {
    // todo(zain): Need to make the first name extraction more reliable,
    // splitting on space is going to fail a bunch i bet.
    return html`
      <h1>
        Lets play some DND ${this.user!.displayName!.split(' ')[0]}
      </h1>
      <button @click=${this.logout}>log out</button>
    `;
  }
}
