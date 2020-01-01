import '../pages/unknown-page/unknown-page';

import {
  LitElement,
  property,
  TemplateResult,
  html,
  customElement,
} from 'lit-element';
import { cache } from 'lit-html/directives/cache';
import { AppState } from '../redux/reducer';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { navigate } from './navigate';

export interface Route {
  pattern?: RegExp;
  path: string;
  public?: boolean;
  component: (args: { [key: string]: string }) => TemplateResult;
}

@customElement('app-router')
export class AppRouter extends connect(store)(LitElement) {
  @property() routes: Route[] = [];
  @property() location!: string;
  @property() loggedIn!: boolean;

  connectedCallback() {
    super.connectedCallback();
    this.routes = this.routes.map(r => {
      const regex = r.path.replace(/:(\w+)/g, '(?<$1>w+)');
      r.pattern = new RegExp(`^${regex}$`);
      return r;
    });
    window.onpopstate = () => {
      store.dispatch({
        type: 'UPDATE_LOCATION',
        value: window.location.pathname,
      });
    };
  }

  stateChanged(state: AppState) {
    this.location = state.router.location;
    this.loggedIn = state.user !== null;
  }

  render() {
    let view = null;
    for (const r of this.routes) {
      const match = r.pattern!.exec(this.location);
      if (!match) continue;
      if (!r.public && !this.loggedIn) {
        // The navigate event won't trigger a rerender so just
        // return the login page.
        navigate('/login');
        return html`
          <login-page></login-page>
        `;
      }
      view = r.component(match.groups || {});
      break;
    }
    if (!view) {
      return html`
        <unknown-page></unknown-page>
      `;
    }
    return html`
      ${cache(view)}
    `;
  }
}
