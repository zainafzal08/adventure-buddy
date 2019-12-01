import { html, customElement, css } from 'lit-element';

import { AsyncElement } from '../../AsyncElement';

@customElement('app-home')
export class AppHome extends AsyncElement {
  static get styles() {
    return css``;
  }

  template() {
    return html`
      <p>Welcome Home</p>
    `;
  }
}
