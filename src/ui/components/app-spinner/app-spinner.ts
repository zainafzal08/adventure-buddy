import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
} from 'lit-element';
import { range } from '../../../util';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';
import { AppState } from '../../../redux/appState';
import { THEMES } from '../../../data/themes';
import tg from 'tinygradient';

function toInline(styles: { [k in string]: string }) {
  const rules = Object.entries(styles).map(([k, v]) => `${k}: ${v}`);
  return rules.join('; ');
}

@customElement('app-spinner')
export class AppSpinner extends connect(store)(LitElement) {
  @property() numPoints: number = 5;
  @property() gradient: tg.Instance | null = null;

  stateChanged(state: AppState) {
    const { primary, secondary } = THEMES[state.settings.theme];
    this.gradient = tg([primary, secondary]);
  }

  static get styles() {
    return css`
      @keyframes bounce {
        0% {
          transform: translate(0px, 10px);
        }
        50% {
          transform: translate(0px, -10px);
        }
        100% {
          transform: translate(0px, 10px);
        }
      }
      :host {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
      }
      .loading-circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        opacity: 0.5;
        margin: 0 2px;
        transform: translate(0px, 20px);
        animation: bounce 1.5s infinite ease;
      }
    `;
  }

  render() {
    const points: TemplateResult[] = [];
    for (const point of range(1, this.numPoints)) {
      const hex = this.gradient!.rgbAt(point / this.numPoints).toHex();
      const pointStyles = {
        background: '#' + hex,
        'animation-delay': (0.1 * point).toString() + 's',
      };
      points.push(html`
        <div
          class="loading-circle"
          style=${toInline(pointStyles)}
        ></div>
      `);
    }
    return html`
      ${points}
    `;
  }
}
