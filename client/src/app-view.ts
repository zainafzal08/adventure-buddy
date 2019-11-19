// Imports with side effects.
import './character-sheet/character-sheet';
import './dm-handbook/dm-handbook';
import './error-page/error-page';
import './user-profile/user-profile';
import './app-home/app-home';
import './ui/app-nav/app-nav';

// Named imports.
import { LitElement, html, customElement, css, TemplateResult, property } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import { UNKNOWN_ROUTE_MSG } from './ui/messages';
import { nothing } from 'lit-html';
import { Database, getDatabase, DatabaseState } from './database';

type RouteRenderer = (match:RegExpExecArray) => TemplateResult;

interface Route {
  pattern: RegExp;
  view: RouteRenderer;
}

@customElement('app-view')
export class AppView extends LitElement {
  /**
   * The theme of the application, this is used to generate a 
   * series of css variables which the rest of the application uses.
   */
  @property() private theme = 'peach';
  /**
   * The view currently shown, all views are defined in
   * the routes getter function.
   */
  @property() private shownView:TemplateResult|{} = nothing;

  /**
   * If the app is ready or not.
   */
  @property() private ready:Boolean = false;
  
  /**
   * The database.
   */
  private database:Database = getDatabase();


  /**
   * All routes that the app can handle, this is a array of objects
   * which define a view function that returns a html template and a 
   * route pattern which defines what url triggers the view to be
   * visible.
   */
  static get routes():Route[] {
    return [
      {
        pattern: /^\/$/,
        view: () => html`<app-home></app-home>`
      },
      {
        pattern: /^\/character\/(\w\d-+)$/,
        view: (match) => html`
          <character-sheet id="${match[1]}"></character-sheet>`
      },
      {
        pattern: /^\/handbook$/,
        view: () => html`<dm-handbook></dm-handbook>`
      },
      {
        pattern: /^\/profile$/,
        view: () => html`<user-profile></user-profile>`
      }
   ];
  }
  
  /**
   * The default error page which we show if the route can't be resolved
   */
  static unknownRouteView() {
    return html`<error-page message=${UNKNOWN_ROUTE_MSG}></error-page>`
  }

  static get styles() {
    // Theme definition
    return css`
      :host {
        --peach-theme-gradient: linear-gradient(110deg, #f2709c, #ff9472);
        --peach-theme-primary: #f2709c;
        --peach-theme-secondary: #ff9472;
        --fresh-theme-gradient: linear-gradient(110deg, #67b26f, #4ca2cd);
        --fresh-theme-primary: #67b26f;
        --fresh-theme-secondary: #4ca2cd;
        --navbar-height: 50px;
        --brand-gradient: linear-gradient(110deg, #B24592, #F15F79);
        --page-vpad: 16px;
        --page-hpad: 48px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      main {
        width: calc(100% - 2 * var(--page-hpad));
        padding: var(--page-vpad) var(--page-hpad);
        min-height: calc(100% - 2 * var(--page-hpad) - var(--navbar-height) - 1px);
        padding: var(--page-vpad) var(--page-hpad);
        background: #fafafa;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate', ((e:CustomEvent) => {
      history.pushState({}, "", e.detail.target);
      this.changeRoute(e.detail.target);
    }) as EventListener);

    window.onpopstate = () => {
      this.changeRoute(document.location.pathname);
    };

    this.ready = this.database.state === DatabaseState.READY;
    if (!this.ready) {
      this.database.ready.then(() => {
        this.ready = true;
        this.changeRoute(document.location.pathname);
      });
    }
  }

  changeRoute(location:string) {
    for(const route of AppView.routes) {
      const m = route.pattern.exec(location);
      if (m) {
        // TODO(zain): Make sure user is loged in.
        this.shownView = route.view(m);
        return;
      }
    }
    this.shownView = AppView.unknownRouteView();
  }

  render() {
    if (!this.ready) {
      return html`<p>Doing a cheeky load innit</p>`;
    }

    return html`
      <style>
        :host {
          --theme-gradient: var(--${this.theme}-theme-gradient);
          --theme-primary: var(--${this.theme}-theme-primary);
          --theme-secondary: var(--${this.theme}-theme-secondary);
        }
      </style>
      <app-nav></app-nav>
      <main>
        ${cache(this.shownView)}
      </main>
    `;
  }
}