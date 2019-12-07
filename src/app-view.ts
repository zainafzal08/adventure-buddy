// Imports with side effects.
import './pages/app-home/app-home';
import './pages/login-page/login-page';
import * as firebase from 'firebase/app';

// Named imports.
import {
  html,
  customElement,
  css,
  TemplateResult,
  property,
  unsafeCSS,
} from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import { nothing } from 'lit-html';
import { getDatabase, DatabaseState } from './data/Database';
import { AsyncElement } from './AsyncElement';

type RouteRenderer = (match: RegExpExecArray) => TemplateResult;

interface Route {
  pattern: RegExp;
  view: RouteRenderer;
}

interface theme {
  gradient: string;
  primary: string;
  secondary: string;
  emphasis: string;
  emphasisBackground: string;
  emphasisHigh: string;
  emphasisLow: string;
}

const PEACH_THEME: theme = {
  gradient: 'linear-gradient(110deg, #f2709c, #ff9472)',
  primary: '#f2709c',
  secondary: '#ff9472',
  emphasis: '#6cbee6',
  emphasisBackground: '#6cbee60f',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
};

const FRESH_THEME: theme = {
  gradient: 'linear-gradient(110deg, #67b26f, #4ca2cd)',
  primary: '#67b26f',
  secondary: '#4ca2cd',
  emphasis: '#6cbee6',
  emphasisBackground: '#6cbee60f',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
};

const THEMES: { [k: string]: theme } = {
  peach: PEACH_THEME,
  fresh: FRESH_THEME,
};

@customElement('app-view')
export class AppView extends AsyncElement {
  /**
   * The theme of the application, this is used to generate a
   * series of css variables which the rest of the application uses.
   */
  @property() private theme = 'peach';

  /**
   * The view currently shown, all views are defined in
   * the routes getter function.
   */
  @property() private shownView: TemplateResult | {} = nothing;

  private user: firebase.User | null = null;

  /**
   * All routes that the app can handle, this is a array of objects
   * which define a view function that returns a html template and a
   * route pattern which defines what url triggers the view to be
   * visible.
   */
  static get routes(): Route[] {
    return [
      {
        pattern: /^\/$/,
        view: () =>
          html`
            <app-home></app-home>
          `,
      },
    ];
  }

  /**
   * The default error page which we show if the route can't be resolved
   */
  static unknownRouteView() {
    return html`
      <p>Unknown Route</p>
    `;
  }

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
        width: calc(100% - 2 * var(--page-hpad));
        padding: var(--page-vpad) var(--page-hpad);
        min-height: calc(
          100% - 2 * var(--page-hpad) - var(--navbar-height) - 1px
        );
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

  async init() {
    this.addEventListener('navigate', ((e: CustomEvent) => {
      history.pushState({}, '', e.detail.target);
      this.changeRoute(e.detail.target);
    }) as EventListener);

    this.addEventListener('login', ((e: CustomEvent) => {
      this.user = e.detail.user;
      this.changeRoute('/');
    }) as EventListener);

    this.addEventListener('logout', (() => {
      firebase.auth().signOut();
      this.user = null;
      history.pushState({}, '', '/');
      this.changeRoute('/');
    }) as EventListener);

    window.onpopstate = () => {
      this.changeRoute(document.location.pathname);
    };

    const database = getDatabase();
    if (database.state !== DatabaseState.READY) {
      await database.ready;
    }
    const fetchedUser = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;
        resolve();
      });
    });
    await fetchedUser;

    this.changeRoute(document.location.pathname);
  }

  changeRoute(location: string) {
    for (const route of AppView.routes) {
      const m = route.pattern.exec(location);
      if (!m) continue;
      if (!this.user) {
        this.shownView = html`
          <login-page></login-page>
        `;
        return;
      }
      this.shownView = route.view(m);
      return;
    }
    this.shownView = AppView.unknownRouteView();
  }

  loading() {
    return html`
      <p>Bruh i'm loading innit luv</p>
    `;
  }

  error() {
    return html`
      <p>Bruh someting went wrong dinnit</p>
    `;
  }

  template() {
    const theme = THEMES[this.theme];
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
      <app-nav></app-nav>
      <main>
        ${cache(this.shownView)}
      </main>
    `;
  }
}
