import { LitElement, html, customElement, css } from 'lit-element';

@customElement('unknown-page')
export class UnknownPage extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  render() {
    return html`
      <p>404 BITCH</p>
    `;
  }
}
