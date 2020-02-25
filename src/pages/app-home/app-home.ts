import '../../ui/components/icon-btn/icon-btn';
import '../../ui/components/character-gallery-item/character-gallery-item';

import { html, customElement, css, LitElement } from 'lit-element';
import { mdiPlusCircleOutline } from '@mdi/js';
import { CharacterSheet } from '../../data/CharacterSheet';
import sittingHuman from '../../assets/humaaans/sitting.svg';
import { connect } from 'pwa-helpers';
import { navigate } from '../../router/navigate';
import { store } from '../../redux/store';

@customElement('app-home')
export class AppHome extends connect(store)(LitElement) {
  private user: firebase.UserInfo | null = null;
  private characters: CharacterSheet[] = [];

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

  stateChanged(state: AppState) {
    this.user = state.user;
  }

  characterList() {
    return this.characters.map(
      character =>
        html`
          <character-gallery-item
            .character=${character}
          ></character-gallery-item>
        `
    );
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

  render() {
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
          <icon-btn icon=${mdiPlusCircleOutline} @click=${() =>
      navigate('/character/new')}>New</icon-btn>
        </div>
        ${
          this.characters.length > 0
            ? this.characterList()
            : this.characterZeroState()
        }
      </div>
      </div>
    `;
  }
}
