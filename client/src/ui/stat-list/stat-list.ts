import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { renderModifier } from '../../util';
import { nothing } from 'lit-html';

export interface StatItem {
  title: string;
  subtitle: string;
  value: number;
  proficient?: boolean;
}

@customElement('stat-list')
export class StatList extends LitElement {
  @property() title!: string;
  @property() items!: StatItem[];
  @property({ reflect: true }) cols: number = 1;

  static get styles() {
    return css`
      :host {
        --heading-font-size: 1.2rem;
        --row-height: 50px;
        --item-title-font-size: 1rem;
        --item-subtitle-font-size: 1rem;
        font-family: var(--font-stack);
      }

      h1 {
        border-bottom: 2px solid #ebebeb;
        color: #444;
        font-size: var(--heading-font-size);
        font-weight: 100;
        margin: 16px 0;
        padding: 8px 0;
        text-align: center;
        width: 100%;
      }
      :host([cols='1']) .items {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 2px 1fr;
        grid-auto-rows: var(--row-height);
      }
      :host([cols='2']) .items {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 2px 1fr 1fr 2px 1fr;
        grid-auto-rows: var(--row-height);
      }
      .text {
        padding-right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
      }
      p {
        margin: 0;
        padding: 0;
        color: #555;
        font-size: var(--item-title-font-size);
        text-transform: capitalize;
        text-align: right;
      }
      .subtitle {
        color: #999;
        font-size: var(--item-subtitle-font-size);
      }
      .sep {
        height: 100%;
        background: #ebebeb;
      }
      .sep.emphasis {
        background: var(--theme-emphasis);
      }
      .value {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 1rem;
        height: calc(100% - 4px);
      }
      .value span {
        margin-left: 0.5em;
        color: var(--theme-emphasis);
        font-size: 0.9rem;
      }
      .value.emphasis {
        background: var(--theme-emphasis-background);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      @media all and (max-width: 1000px) {
        :host {
          --item-title-font-size: 0.9rem;
          --item-subtitle-font-size: 0.9rem;
        }
      }
    `;
  }

  renderItem(item: StatItem) {
    return html`
      <div class="text">
        <p>${item.title}</p>
        <p class="subtitle">${item.subtitle}</p>
      </div>
      <div class="sep ${item.proficient ? 'emphasis' : ''}"></div>
      <div class="value ${item.proficient ? 'emphasis' : ''}">
        ${renderModifier(item.value, item.proficient)}
        ${item.proficient
          ? html`
              <span>Proficient</span>
            `
          : nothing}
      </div>
    `;
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <div class="items">
        ${this.items.map(e => this.renderItem(e))}
      </div>
    `;
  }
}
