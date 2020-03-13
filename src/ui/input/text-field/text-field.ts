import { html, customElement, css, property, query } from 'lit-element';

import { BaseInput } from '../base-input';

@customElement('text-field')
export class TextField extends BaseInput<string> {
  @property() name: string = 'textField';
  @property() placeholder: string = 'Enter Text Here';
  @property() initial: string = '';
  @property() id: string = '';
  @property({ type: Boolean }) canBeEmpty: boolean = false;
  @property() private help: string = '';

  @query('input') input!: HTMLInputElement;

  // BaseInput Implemenetation:
  getValue() {
    return this.input.value;
  }

  setValue(value: string) {
    this.input.value = value;
  }

  clearValue() {
    this.value = this.initial;
  }

  valueValid() {
    return this.help === '';
  }

  validate() {
    this.help = '';
    if (!this.canBeEmpty && this.value === '') {
      this.help = "This field can't be empty";
    }
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
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
      }
      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }
      .group input[type='text'] {
        border: none;
        outline: none;
        height: 1.6rem;
        width: 100%;
        background: none;
        color: #777;
        padding: 0.3rem 0;
        font-size: 1.1rem;
        border-bottom: 2px solid #ebebeb;
      }
      .group:focus-within input[type='text'] {
        border-bottom: 2px solid var(--theme-primary);
      }
      input[type='text']::placeholder {
        color: #cecece;
      }
      small {
        margin-top: 8px;
        color: var(--theme-emphasis-low);
        height: 1rem;
        font-size: 0.65rem;
      }
    `;
  }

  render() {
    return html`
      <div class="group" @input=${this.valueChanged}>
        <label for="input">${this.name}</label>
        <input
          type="text"
          placeholder=${this.placeholder}
          value=${this.initial}
        />
        <small> ${this.help} </small>
      </div>
    `;
  }
}
