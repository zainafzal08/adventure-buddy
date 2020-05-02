import '../../components/mdi-icon/mdi-icon';

import { html, customElement, css, property } from 'lit-element';
import { BaseInput } from '../base-input';

@customElement('icon-selector')
export class IconSelector extends BaseInput<string> {
  @property({ type: Array }) options: string[] = [];
  @property() selected: string = '';

  // BaseInput Implementation:
  getValue() {
    return this.selected;
  }

  setValue(s: string) {
    this.selected = s;
  }

  clearValue() {
    if (this.options.length < 1) return;
    this.selected = this.options[0];
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
      }
      .option {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--theme-primary-light);
        display: flex;
        align-items: center;
        justify-content: center;
        --icon-color: var(--theme-primary);
        cursor: pointer;
      }
      .option:hover {
        transform: scale(1.1);
      }
      .option[selected] {
        background: var(--theme-primary);
        --icon-color: #ffffff;
      }
      .option[selected] {
        cursor: default;
      }
      .option[selected]:hover {
        transform: scale(1);
      }
    `;
  }

  render() {
    if (this.selected === '' && this.options.length > 0) {
      this.selected = this.options[0];
    }
    return html`
      ${this.options.map(
        x =>
          html`
            <div
              class="option"
              ?selected=${x === this.selected}
              @click=${() => {
                this.value = x;
              }}
            >
              <mdi-icon
                icon=${x}
                size=${22}
                color="var(--icon-color)"
              ></mdi-icon>
            </div>
          `
      )}
    `;
  }
}
