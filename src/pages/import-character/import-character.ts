import { html, customElement, css } from 'lit-element';
import { AsyncElement } from '../../AsyncElement';

@customElement('import-character')
export class ImportCharacter extends AsyncElement {
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
