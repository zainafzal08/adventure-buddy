import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { renderModifier } from '../../util';

@customElement('stat-item')
export class StatItem extends LitElement {
  @property() title!: string;
  @property() subtitle!: string;
  @property() value!: number;
  @property() emphasis: boolean = false;
  @property({ reflect: true }) layout: string = 'default';

  static get styles() {
    return css`
      :host {
        --text-width: 125px;
        --value-width: 50px;
        --title-font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;
      }
      :host([layout='fill']) {
        --text-width: 180px;
        --value-width: 40px;
        --title-font-size: 1.2rem;
        font-family: 'Montserrat', sans-serif;
      }

      .stat {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
      }
      .stat .text {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
        border-right: 2px solid #ebebeb;
        width: var(--text-width);
        padding: 4px 1rem 4px 0;
      }
      .stat .text p {
        font-size: var(--title-font-size);
        color: #555;
        text-align: right;
        margin: 0;
        text-transform: capitalize;
      }
      .stat .text small {
        margin-top: 0.2rem;
        font-size: 1rem;
        color: #999;
        grid-area: subtitle;
        text-align: right;
      }
      .stat .value {
        height: 100%;
        width: var(--value-width);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
      @media all and (max-width: 1000px) {
        :host {
          --text-width: 100px;
          --title-font-size: 1rem;
          --value-width: 30px;
        }
      }
      @media all and (max-width: 900px) {
        .stat {
          width: 200px;
        }
        h1 {
          text-align: left;
          padding-left: 1rem;
        }
        .container {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="stat">
        <div class="text">
          <p>${this.title}</p>
          <small>${this.subtitle}</small>
        </div>
        <div class="value">
          ${renderModifier(this.value)}
        </div>
      </div>
    `;
  }
}
