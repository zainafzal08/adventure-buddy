import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { CharacterSheetDescriptor } from '../../data/CharacterSheet';

@customElement('character-card')
export class CharacterCard extends LitElement {
  @property() character!: CharacterSheetDescriptor;

  static get styles() {
    return css`
      :host {
        width: 450px;
        height: 600px;
        box-sizing: border-box;
        padding: 32px 0;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      }
      .basics {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      }
      .basics .img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #ebebeb;
        margin-bottom: 1rem;
      }
      .basics .text {
        width: 60%;
        height: 1.1rem;
        font-size: 1rem;
        text-align: center;
        color: #777;
        margin: 0.5rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .basics .text.empty {
        background: #ebebeb;
      }
      .basics .text-small {
        width: 40%;
        height: 1rem;
        background: #ebebeb;
        margin: 0.5rem 0;
      }
    `;
  }

  getName() {
    if (!this.character.name) {
      return html`
        <div class="text empty"></div>
      `;
    } else {
      return html`
        <div class="text">${this.character.name}</div>
      `;
    }
  }

  render() {
    return html`
      <div class="basics">
        <div class="img"></div>
        ${this.getName()}
        <div class="text-small empty"></div>
      </div>
    `;
  }
}
