import { CharacterPreview } from '../ui/character-preview/character-preview';
import { LitElement, html, customElement, css, property } from 'lit-element';
import { CharacterSheetData, getDatabase, CharacterSheetDescriptor } from '../database';

import icons from '../assets/icons/*.svg';
import { getNavigateEvent } from '../util';

@customElement('app-home')
export class AppHome extends LitElement {
  
  @property() userCharacters:CharacterSheetData[]|null = null;
  @property() ready:boolean = false;

  private database = getDatabase();

  static get styles() {
      return css`
        :host {
          width: 100%;
        }
        h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 100;
          color: #444;
          opacity: .8;
        }
        hr {
          height: 3px;
          background: #EBEBEB;
          outline: none;
          border: none;
        }
        .grid-view {
          width: 100%;
          padding-top: 32px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 350px));
          grid-row-gap: 16px;
        }
        .new-character-sheet {
          width: 300px;
          height: 56px;
          padding: 10px;
          border-radius: 10px;
          border: 2px solid #EBEBEB;
          background: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: .5;
          cursor: pointer;
        }
        .new-character-sheet:hover {
          opacity: 1;
        }
        .new-character-sheet img {
          width: 38px;
          opacity: .2;
        }
      `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.database.getAllCharacters().then(characters => {
      this.userCharacters = characters;
      this.ready = true;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ready = false;
    this.userCharacters = null;
  }

  renderPreview(data: CharacterSheetData) {
    return new CharacterPreview(data);
  }

  newCharacter() {
    const defaultDescriptor:CharacterSheetDescriptor = {
      id: null, // Auto generate
      name: 'New Character',
      level: 1,
      class: 'fighter',
      race: 'human'
    }
    this.ready = false;

    this.database.createCharacterSheet(defaultDescriptor).then(id => {
      this.dispatchEvent(getNavigateEvent(`/character/${id}`));
    })
  }

  render() {
    if (!this.ready) {
      return html`loading innit`;
    }

    return html`
      <h1> Character Sheets </h1>
      <hr>
      <div class="grid-view">
        ${this.userCharacters!.map(this.renderPreview)}
        <div class="new-character-sheet" @click=${this.newCharacter}>
          <img src="${icons['plus']}"/>
        </div>
      </div>
    `;
  }
}