// Imports with side effects.
import './components/app-nav/app-nav';
import './router/app-router';

// Named imports.
import {
  html,
  customElement,
  css,
  property,
  unsafeCSS,
  LitElement,
} from 'lit-element';

import * as firebase from 'firebase/app';
import { getDatabase, DatabaseState } from './data/Database';
import { THEMES, ThemeName } from './themes';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { AppState } from './redux/reducer';
import { ROUTES } from './routes';

@customElement('app-view')
export class AppView extends connect(store)(LitElement) {
  /**
   * The theme of the application, this is used to generate a
   * series of css variables which the rest of the application uses.
   */
  @property() private theme: ThemeName = 'peach';

  static get styles() {
    return css`
      :host {
        --navbar-height: 50px;
        --brand-gradient: linear-gradient(to right, #b24592, #f15f79);
        --brand-primary: #b24592;
        --brand-secondary: #f15f79;
        --brand-secondary-light: #f15f79dd;
        --page-vpad: 16px;
        --page-hpad: 48px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      main {
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        padding: var(--page-vpad) var(--page-hpad);
      }
      @media all and (max-width: 550px) {
        :host {
          --page-vpad: 4px;
          --page-hpad: 12px;
        }
      }
    `;
  }

  async blah() {
    // todo(zain): Delegate all auth stuff to it's own global object?
    this.addEventListener('login', ((e: CustomEvent) => {
      getDatabase().login(e.detail.user);
    }) as EventListener);

    this.addEventListener('logout', (async () => {
      firebase.auth().signOut();
      await getDatabase().logout();
    }) as EventListener);

    const database = getDatabase();
    if (database.state !== DatabaseState.READY) {
      await database.ready;
    }

    const fetchedUser = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        // TODO(zain): Maybe actually wait for this and handle
        // it failing...
        if (user) database.login(user);
        resolve();
      });
    });
    await fetchedUser;
  }

  stateChanged(state: AppState) {
    this.theme = state.settings.theme;
  }

  render() {
    const theme = THEMES[this.theme as ThemeName];
    const rules = [];
    for (let [property, value] of Object.entries(theme)) {
      property = property.replace(/[A-Z]/, (match: string) => {
        return '-' + match.toLowerCase();
      });
      rules.push(
        css`--theme-${unsafeCSS(property)}: ${unsafeCSS(value)};`
      );
    }

    return html`
      <style>
        :host {
          ${rules};
          --neutral: #ccc;
          --font-stack: 'Montserrat', sans-serif;
        }
      </style>
      ${window.location.pathname !== '/login'
        ? html`
            <app-nav></app-nav>
          `
        : null}
      <main>
        <app-router .routes=${ROUTES}></app-router>
      </main>
    `;
  }
}
