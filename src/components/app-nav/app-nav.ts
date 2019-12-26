import '../mdi-icon/mdi-icon';

import { LitElement, html, customElement, css } from 'lit-element';
import { getLogoutEvent } from '../../util';
import { mdiLogout, mdiSettings, mdiFace, mdiHome } from '@mdi/js';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { navigate } from '../../router/navigate';

@customElement('app-nav')
export class AppNav extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        width: calc(100% - 32px);
        height: var(--navbar-height);
        display: flex;
        padding: 0 16px;
        align-items: center;
        justify-content: flex-end;
      }
      mdi-icon {
        margin: 0 0.3rem;
        opacity: 0.78;
        cursor: pointer;
      }
      mdi-icon:hover {
        opacity: 1;
      }
    `;
  }

  items() {
    return [
      {
        icon: mdiLogout,
        handler: this.logout,
      },
      {
        icon: mdiSettings,
        handler: this.settings,
      },
      {
        icon: mdiFace,
        handler: this.profile,
      },
      {
        icon: mdiHome,
        handler: this.home,
      },
    ];
  }

  home() {
    navigate('/');
  }

  logout() {
    this.dispatchEvent(getLogoutEvent());
  }

  settings() {
    navigate('/settings');
  }

  profile() {}

  render() {
    return html`
      ${this.items().map(
        item => html`
          <mdi-icon
            .color=${css`var(--theme-primary)`}
            size="28"
            icon=${item.icon}
            @click=${item.handler}
            button="true"
          ></mdi-icon>
        `
      )}
    `;
  }
}
