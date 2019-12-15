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
        margin: 0.5rem 0;
        text-align: center;
        color: #777;
      }
      .basics .text-small.empty {
        background: #ebebeb;
      }
    `;
  }

  placeholder(elemClass: string, value: string) {
    const div = document.createElement('div');
    div.classList.add(elemClass);
    if (!value) div.classList.add('empty');
    div.innerText = value;
    return div;
  }

  getDescriptor() {
    let level = `Level ${this.character.level}`;
    if (this.character.level === -1 || !this.character.level)
      level = '';

    return [level, this.character.race, this.character.class]
      .filter(x => x !== '')
      .join(' ');
  }

  render() {
    return html`
      <div class="basics">
        <div class="img"></div>
        ${this.placeholder('text', this.character.name)}
        ${this.placeholder('text-small', this.getDescriptor())}
      </div>
    `;
  }
}
