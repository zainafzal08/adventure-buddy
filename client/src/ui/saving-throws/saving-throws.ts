import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { CharacterSheetData } from '../../database';

@customElement('saving-throws')
export class SavingThrows extends LitElement {
  @property() sheet!: CharacterSheetData;

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        font-family: 'Montserrat', sans-serif;
      }
      h1 {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        color: #444;
        font-weight: 100;
        padding: 8px 0;
        margin: 16px 0;
        border-bottom: 2px solid #ebebeb;
      }
      @media all and (max-width: 900px) {
        h1 {
          text-align: left;
          padding-left: 8px;
        }
      }
    `;
  }

  render() {
    return html`
      <h1>Saving</h1>
    `;
  }
}
