import { html, customElement, css, property, query } from 'lit-element';

import { BaseInput } from '../base-input/base-input';

@customElement('number-field')
export class NumberInput extends BaseInput {
  // User facing
  @property({ attribute: true }) name: string = 'numberField';
  @property() range: [number?, number?] = [];

  @property() private help: string = '';
  @query('.group') private group!: HTMLDivElement;

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
        text-transform: capitalize;
      }

      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }

      .group.invalid:focus-within label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      .group.invalid label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }

      .group input {
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

      .group:focus-within input {
        border-bottom: 2px solid var(--theme-primary);
      }
      .group.invalid:focus-within input {
        border-bottom: 2px solid var(--theme-emphasis-low);
      }
      .group.invalid input {
        border-bottom: 2px solid var(--theme-emphasis-low);
      }
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      small {
        color: #ccc;
        font-size: 0.5rem;
        margin-top: 0.4rem;
        height: 0.8rem;
      }
      .group.invalid small {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
    `;
  }

  updateValue(value: string) {
    this.validate(value);
  }

  notNum(v: string) {
    return isNaN(parseInt(v));
  }

  notInRange(v: number) {
    let valid = true;
    if (this.range[0] !== undefined) {
      valid = valid && v >= this.range[0];
    }
    if (this.range[1] !== undefined) {
      valid = valid && v <= this.range[1];
    }
    return !valid;
  }

  validate(value: string) {
    // Debounce calls made before object is ready
    if (this.group === null) return;
    let error = '';
    this.help = '';

    if (this.notNum(value)) {
      error = 'Value must be a number';
    } else if (this.notInRange(parseInt(value))) {
      if (this.range[1]) {
        error = `Value must be between ${this.range[0]} and ${this.range[1]}`;
      } else {
        error = `Value must be at least ${this.range[0]}`;
      }
    }
    if (error) {
      this.help = error;
    }
    this.group.classList.toggle('invalid', error !== '');
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          id="input"
          type="number"
          min=${this.range[0] ? this.range[0] : ''}
          max=${this.range[1] ? this.range[1] : ''}
        />
        <small>${this.help}</small>
      </div>
    `;
  }
}
