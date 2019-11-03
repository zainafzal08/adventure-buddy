// Imports with side effects.
import './character-sheet/character-sheet';
import './dm-handbook/dm-handbook';
import './error-page/error-page';
import './user-profile/user-profile';
import './ui/app-nav/app-nav';

// Named imports.
import { LitElement, html, customElement, css, TemplateResult, } from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import { UNKNOWN_ROUTE_MSG } from './ui/messages';

@customElement('app-view')
export class AppView extends LitElement {
    /**
   * The theme of the application, this is used to generate a 
   * series of css variables which the rest of the application uses.
   */
  private theme = 'peach';
  /**
   * The view currently shown, all views are defined in
   * the routes getter function.
   */
  private shownView!:() => TemplateResult;
  
  /**
   * All routes that the app can handle, this is a array of objects
   * which define a view function that returns a html template and a 
   * route pattern which defined what url triggers the view to be
   * visible.
   */
  static get routes() {
    return [
      {
        pattern: new RegExp('^\/$'),
        view: () => html`<character-sheet></character-sheet>`
      },
      {
        pattern: new RegExp('^\/handbook$'),
        view: () => html`<dm-handbook></dm-handbook>`
      },
      {
        pattern: new RegExp('^\/profile$'),
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
        --fresh-theme-gradient: linear-gradient(110deg, #67b26f, #4ca2cd);
        --fresh-theme-primary: #67b26f;
        --navbar-height: 50px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate', ((e:CustomEvent) => {
      document.location.pathname = e.detail.target;
      this.changeRoute(e.detail.target);
    }) as EventListener);

    this.changeRoute(document.location.pathname);
  }

  changeRoute(location:string) {
    for(const route of AppView.routes) {
      if (route.pattern.exec(location)) {
        this.shownView = route.view;
        return;
      }
    }
    this.shownView = AppView.unknownRouteView;
  }

  render() {
    // This will edventually have a login flow leading to the home page
    // where you can create new character sheets / characters

    return html`
      <style>
        :host {
          --theme-gradient: var(--${this.theme}-theme-gradient);
          --theme-primary: var(--${this.theme}-theme-primary);
        }
      </style>
      <app-nav></app-nav>
      ${cache(this.shownView())}
    `;
  }
}