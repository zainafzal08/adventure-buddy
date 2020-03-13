import { html, customElement, css, property, query } from 'lit-element';
import { BaseInput } from '../base-input';

@customElement('selection-field')
export class SelectionField extends BaseInput<string> {
  @property() name: string = 'selectionField';
  @property() options: string[] = [];
  @property() id: string = '';

  @query('select') select!: HTMLSelectElement;

  // BaseInput Implementation:
  getValue(): string {
    return this.select.value;
  }

  setValue(value: string) {
    this.select.value = value;
  }

  clearValue() {
    this.value = this.options[0];
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .group {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
      }

      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }
      .group:focus-within .underline {
        background: var(--theme-primary);
      }

      select {
        border: none;
        margin-top: 0.3rem;
        width: 100%;
        margin-top: 0.6rem;
        margin-bottom: 0.4rem;
        color: #777;
        font-size: 0.9rem;
        background: none;
        /* So it's left aligned... */
        margin-left: -0.5rem;
      }
      select:focus {
        outline: none;
      }

      .underline {
        width: 100%;
        height: 2px;
        background: #ebebeb;
        margin-bottom: 1.2rem;
      }
    `;
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <select>
          ${this.options.map(
            option =>
              html`
                <option>${option}</option>
              `
          )}
        </select>
        <div class="underline"></div>
      </div>
    `;
  }
}
