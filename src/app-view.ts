// Imports with side effects.
import './pages/app-home/app-home';
import './pages/login-page/login-page';
import './pages/settings-page/settings-page';
import './pages/new-character/new-character';
import './components/app-nav/app-nav';
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
import { getDatabase, DatabaseState, Settings } from './data/Database';
import { AsyncElement } from './AsyncElement';
import { THEMES } from './themes';

type RouteRenderer = (match: RegExpExecArray) => TemplateResult;

interface Route {
  pattern: RegExp;
  view: RouteRenderer;
}

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

  /**
   * If the navbar should be shown.
   */
  private showNavbar: boolean = false;

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
      {
        pattern: /^\/new\/character/,
        view: () =>
          html`
            <new-character></new-character>
          `,
      },
      {
        pattern: /^\/settings/,
        view: () =>
          html`
            <settings-page></settings-page>
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
        height: calc(
          100vh - (2 * var(--page-vpad)) - var(--navbar-height)
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

  updateSettings(newSettings: Settings) {
    this.theme = newSettings.theme;
  }

  async init() {
    this.addEventListener('navigate', ((e: CustomEvent) => {
      this.changeRoute(e.detail.target);
    }) as EventListener);

    // todo(zain): Delegate all auth stuff to it's own global object?
    this.addEventListener('login', ((e: CustomEvent) => {
      getDatabase().login(e.detail.user);
      this.changeRoute('/');
    }) as EventListener);

    this.addEventListener('logout', (async () => {
      firebase.auth().signOut();
      await getDatabase().logout();
      this.changeRoute('/');
    }) as EventListener);

    window.onpopstate = (e: PopStateEvent) => {
      if (e.state) {
        this.changeRoute(e.state.target, false);
      }
    };

    const database = getDatabase();
    if (database.state !== DatabaseState.READY) {
      await database.ready;
    }

    database.addSettingsListener(newSettings =>
      this.updateSettings(newSettings)
    );

    const settings = await database.getSettings();
    this.theme = settings.theme;

    const fetchedUser = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        // TODO(zain): Maybe actually wait for this and handle
        // it failing...
        if (user) database.login(user);
        resolve();
      });
    });
    await fetchedUser;
    const location = document.location.pathname;
    await this.changeRoute(location, false);
    history.replaceState({ target: location }, '', location);
  }

  async changeRoute(location: string, appendToHistory = true) {
    if (appendToHistory)
      history.pushState({ target: location }, '', location);
    this.showNavbar = false;
    const user = await getDatabase().getUser();
    for (const route of AppView.routes) {
      const m = route.pattern.exec(location);
      if (!m) continue;
      if (!user) {
        this.shownView = html`
          <login-page></login-page>
        `;
        return;
      }
      this.shownView = route.view(m);
      this.showNavbar = true;
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
      ${this.showNavbar
        ? html`
            <app-nav></app-nav>
          `
        : nothing}
      <main>
        ${cache(this.shownView)}
      </main>
    `;
  }
}
