import { html, customElement, css, property, query } from 'lit-element';
import { BaseInput } from '../base-input';

function notNum(v: string) {
  return isNaN(parseInt(v));
}

@customElement('number-field')
export class NumberField extends BaseInput<number> {
  // User facing
  @property() name: string = 'numberField';
  @property() inital: number | null = null;
  @property() start: number | null = null;
  @property() stop: number | null = null;

  @property() private help: string = '';
  @query('.group') private group!: HTMLDivElement;
  @query('input') private input!: HTMLInputElement;

  // BaseInput Implementation:

  validate() {
    const value = this.input.value;
    // Debounce calls made before object is ready
    if (this.group === null) return;
    let error = '';
    this.help = '';

    if (notNum(value)) {
      error = 'Value must be a number';
    } else if (!this.inRange(parseInt(value))) {
      if (this.start !== null && this.stop !== null) {
        error = `Value must be between ${this.start} and ${this.stop}`;
      } else if (this.stop !== null) {
        error = `Value must not exceed ${this.stop}`;
      } else {
        error = `Value must be at least ${this.start}`;
      }
    }
    if (error) {
      this.help = error;
    }
    this.group.classList.toggle('invalid', error !== '');
  }

  getValue() {
    if (!this.input) return this.getInitialValue();
    const v = parseInt(this.input.value);
    if (isNaN(v)) return this.getInitialValue();
    return v;
  }

  setValue(v: number) {
    this.input.value = v.toString();
  }

  clearValue() {
    this.value = this.getInitialValue();
  }

  valueValid() {
    return this.help === '';
  }

  // NumberField Implementation:
  getInitialValue() {
    let initialValue = this.inital;
    if (initialValue === null) {
      initialValue = this.start === null ? 0 : this.start;
    }
    return initialValue;
  }

  inRange(v: number) {
    let valid = true;
    if (this.stop !== null) {
      valid = valid && v <= this.stop;
    }
    if (this.start !== null) {
      valid = valid && v >= this.start;
    }
    return valid;
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

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          type="number"
          min=${this.start === null ? '' : this.start}
          max=${this.stop === null ? '' : this.stop}
        />
        <small>${this.help}</small>
      </div>
    `;
  }
}
