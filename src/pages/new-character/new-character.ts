import { LitElement, html, customElement, css } from 'lit-element';

@customElement('new-character')
export class NewCharacter extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  render() {
    return html`
      <p>Hello</p>
    `;
  }
}
