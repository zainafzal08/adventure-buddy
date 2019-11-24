import { CharacterPreview } from '../ui/character-preview/character-preview';
import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import {
  CharacterSheetData,
  getDatabase,
  CharacterSheetDescriptor,
  Skill,
} from '../database';

import icons from '../assets/icons/*.svg';
import { getNavigateEvent } from '../util';

@customElement('app-home')
export class AppHome extends LitElement {
  @property() userCharacters: CharacterSheetData[] | null = null;
  @property() ready: boolean = false;

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
        opacity: 0.8;
      }
      hr {
        height: 3px;
        background: #ebebeb;
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
        border: 2px solid #ebebeb;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        cursor: pointer;
      }
      .new-character-sheet:hover {
        opacity: 1;
      }
      .new-character-sheet img {
        width: 38px;
        opacity: 0.2;
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

  async createCharacter() {
    const count = await this.database.numCharacters();
    const defaultDescriptor: CharacterSheetDescriptor = {
      id: null, // Auto generate
      name: count > 0 ? `New Character ${count}` : 'New Character',
      level: 1,
      class: 'fighter',
      race: 'human',
      ability: {
        str: 16,
        dex: 13,
        con: 11,
        int: 12,
        wis: 14,
        chr: 8,
        spd: 25,
        ac: 10,
        prf: 2,
      },
      specialBonus: {},
      proficiencies: [
        Skill.ANIMAL_HANDLING,
        Skill.ATHLETICS,
        Skill.NATURE,
        Skill.SLEIGHT_OF_HAND,
        Skill.NATURE,
        'wis',
        'int',
      ],
    };
    const id = await this.database.createCharacterSheet(
      defaultDescriptor
    );
    this.dispatchEvent(getNavigateEvent(`/character/${id}`));
  }

  newCharacter() {
    this.ready = false;
    this.createCharacter().then(() => {
      this.ready = true;
    });
  }

  render() {
    if (!this.ready) {
      return html`
        loading innit
      `;
    }

    return html`
      <h1>Character Sheets</h1>
      <hr />
      <div class="grid-view">
        ${this.userCharacters!.map(this.renderPreview)}
        <div class="new-character-sheet" @click=${this.newCharacter}>
          <img src="${icons['plus']}" />
        </div>
      </div>
    `;
  }
}
