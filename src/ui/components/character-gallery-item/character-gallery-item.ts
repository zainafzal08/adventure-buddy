
import { LitElement, html, customElement, css } from 'lit-element';

@customElement('character-gallery-item')
export class CharacterGalleryItem extends LitElement {
  static get styles() {
      return css`
          :host {

          }
      `;
  }

  render() {
    return html`<p>Hello</p>`;
  }
}
