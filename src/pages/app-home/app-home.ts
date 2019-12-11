import '../../components/mdi-icon/mdi-icon';

import { html, customElement, css } from 'lit-element';
import { mdiPlusCircleOutline, mdiAccountMultiple } from '@mdi/js';

import { AsyncElement } from '../../AsyncElement';
import { getDatabase } from '../../data/Database';

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
    `;
  }

  async init() {
    this.user = await getDatabase().getUser();
  }

  template() {
    // todo(zain): Need to make the first name extraction more reliable,
    // splitting on space is going to fail a bunch i bet.
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
      </div>
      <div class="list-container">
        <div class="list-title">
          <h2>Games</h2>
          <div class="chip-button">
            <mdi-icon
              .color=${css`var(--theme-primary)`}
              icon="${mdiPlusCircleOutline}"
            ></mdi-icon>
            Create
          </div>
          <div class="chip-button">
            <mdi-icon
              .color=${css`var(--theme-primary)`}
              icon="${mdiAccountMultiple}"
            ></mdi-icon>
            Join
          </div>
        </div>
      </div>
    `;
  }
}
