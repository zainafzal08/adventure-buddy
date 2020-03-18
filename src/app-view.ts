// Imports with side effects.
import './ui/components/app-nav/app-nav';
import './router/app-router';
import './pages/app-home/app-home';
import './pages/login-page/login-page';
import './pages/settings-page/settings-page';
import './pages/help-page/help-page';
import './pages/new-character/new-character';

// Named imports.
import {
  html,
  customElement,
  css,
  property,
  unsafeCSS,
  LitElement,
} from 'lit-element';

import { THEMES } from './data/themes';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { AppState } from './redux/appState';
import { Route } from './router/app-router';
import { initArtificer } from './data/artificer';

export const ROUTES: Route[] = [
  {
    path: '/',
    component: () =>
      html`
        <app-home></app-home>
      `,
  },
  {
    path: '/settings',
    component: () =>
      html`
        <settings-page></settings-page>
      `,
  },
  {
    path: '/login',
    public: true,
    component: () =>
      html`
        <login-page></login-page>
      `,
  },
  {
    path: '/character/new',
    component: () =>
      html`
        <new-character></new-character>
      `,
  },
  {
    path: '/help',
    component: () =>
      html`
        <help-page></help-page>
      `,
  },
];

@customElement('app-view')
export class AppView extends connect(store)(LitElement) {
  /**
   * The theme of the application, this is used to generate a
   * series of css variables which the rest of the application uses.
   */
  @property() private theme: keyof typeof THEMES = 'peach';
  @property() private location!: string;

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
        height: calc(100vh - var(--navbar-height));
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

  firstUpdated() {
    /**
     * @todo Put a inital loading screen.
     * @body We need to block UI while the artificer sets up with lunr.
     */
    initArtificer();
  }

  stateChanged(state: AppState) {
    this.theme = state.settings.theme;
    this.location = state.router.location;
  }

  render() {
    const theme = THEMES[this.theme];
    const rules = [];
    for (let [property, value] of Object.entries(theme)) {
      property = property.replace(/[A-Z]/g, (match: string) => {
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
          --soft-box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.05);
        }
      </style>
      ${this.location !== '/login'
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
