import '../../components/mdi-icon/mdi-icon';

import { html, customElement, css } from 'lit-element';
import { mdiPlusCircleOutline } from '@mdi/js';

import { AsyncElement } from '../../AsyncElement';
import { getDatabase } from '../../data/Database';
import { CharacterSheet } from '../../data/CharacterSheet';
import sittingHuman from '../../assets/humaaans/sitting.svg';

@customElement('app-home')
export class AppHome extends AsyncElement {
  private user: firebase.UserInfo | null = null;

  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
      }
      .heading {
        height: 10%;
        margin-bottom: 16px;
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #ebebeb;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .list-container {
        height: 45%;
        width: 100%;
      }
      .list-container .list-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .chip-button {
        padding: 0.3rem 0.5rem;
        border-radius: 15px;
        margin: 0 0.3rem;
        color: var(--theme-primary);
        background: var(--theme-primary-light);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.32s all;
      }
      .chip-button:hover {
        box-shadow: 1px 2px 4px rgba(242, 112, 156, 0.4);
      }
      .chip-button mdi-icon {
        margin-right: 0.3rem;
      }
      h2 {
        margin: 0;
        font-weight: 100;
        color: var(--theme-primary);
        padding-right: 1rem;
        border-right: 2px solid #ebebeb;
        width: fit-content;
        margin-right: 0.5rem;
      }
      .zero-state {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .zero-state img {
        filter: grayscale(1);
        opacity: 0.4;
        width: 160px;
      }
      .zero-state p {
        color: #bbb;
        text-align: center;
      }
    `;
  }

  async init() {
    this.user = await getDatabase().getUser();
  }

  characterList(characters: CharacterSheet[]) {
    return html`
      nada
    `;
  }

  characterZeroState() {
    return html`
      <div class="zero-state">
        <img src=${sittingHuman} />
        <p>
          The best part is making the characters, What are you waiting
          for?
        </p>
      </div>
    `;
  }

  template() {
    const characters: CharacterSheet[] = [];

    return html`
      <div class="heading">
        <h1>
          Hey <span>${this.user!.displayName!.split(' ')[0]}</span>,
          Lets play some DND
        </h1>
      </div>
      <div class="list-container">
        <div class="list-title">
          <h2>Characters</h2>
          <div class="chip-button">
            <mdi-icon
              .color=${css`var(--theme-primary)`}
              icon="${mdiPlusCircleOutline}"
            ></mdi-icon>
            New
          </div>
        </div>
        ${
          characters.length > 0
            ? this.characterList(characters)
            : this.characterZeroState()
        }
      </div>
      </div>
    `;
  }
}
