import {
  html,
  customElement,
  css,
  property,
  LitElement,
} from 'lit-element';
import { THEMES } from '../../data/themes';
import { connect } from 'pwa-helpers';
import { Settings } from '../../data/settings';
import { AppState } from '../../redux/appState';
import { store } from '../../redux/store';

@customElement('settings-page')
export class SettingsPage extends connect(store)(LitElement) {
  @property() settings!: Settings;

  stateChanged(state: AppState) {
    this.settings = state.settings;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        flex-direction: column;
        font-family: var(--font-stack);
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #ebebeb;
        font-family: var(--font-stack);
        margin-bottom: 32px;
      }
      h1 span {
        color: var(--theme-primary);
      }
      label {
        color: #aaa;
      }
      .row {
        display: flex;
        margin: 16px 0;
      }
      .theme-selector {
        margin: 0 8px;
        width: 52px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
        cursor: pointer;
        transform: scale(0.8);
        transition: 0.4s;
      }
      .theme-selector:hover {
        opacity: 0.8;
        transform: scale(0.9);
      }
      .theme-selector.active {
        opacity: 1;
        cursor: default;
        transform: scale(1);
      }
      .theme-selector.active:hover {
        opacity: 1;
        transform: scale(1);
      }
      .theme-selector div {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-bottom: 8px;
      }
      .theme-selector small {
        text-transform: capitalize;
        color: #777;
        text-align: center;
        width: 100%;
      }
    `;
  }

  updateTheme(value: string) {
    store.dispatch({
      type: '@@settings/UPDATE_THEME',
      value,
    });
  }

  themeList() {
    const result = [];
    const active = this.settings.theme;
    for (let theme of Object.keys(THEMES)) {
      result.push(
        html`
          <div
            class="theme-selector ${active === theme ? 'active' : ''}"
            @click=${() => this.updateTheme(theme)}
          >
            <div
              style="background: ${THEMES[theme as keyof typeof THEMES]
                .gradient}"
            ></div>
            <small>${theme}</small>
          </div>
        `
      );
    }
    return result;
  }

  template() {
    return html`
      <h1><span>Customise</span> your Adventure Buddy here</h1>
      <div class="setting">
        <label>Theme</label>
        <div class="row">
          ${this.themeList()}
        </div>
      </div>
    `;
  }
}
