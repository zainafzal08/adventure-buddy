import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { AppState } from '../../redux/reducer';
import { store } from '../../redux/store';
import { connect } from 'pwa-helpers';

@customElement('number-field')
export class NumberField extends connect(store)(LitElement) {
  // User facing
  @property({ attribute: true }) name: string = 'numberField';
  @property() reflect: string = '';
  @property() range: [number?, number?] = [];
  @property() value: string = '';
  @property() changeListener: (v: string) => void = () => {};

  @property() private help: string = '';

  @query('input') input!: HTMLInputElement;
  @query('.group') group!: HTMLDivElement;

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

  stateChanged(state: AppState) {
    if (this.reflect === '') return;
    // Sue me.
    let val = state as any;
    for (const field of this.reflect.split('.')) {
      val = val[field];
    }
    this.value = val === undefined ? '' : val;
    // Acutally update the input field to match.
    if (this.input) this.input.value = this.value;
    this.validate();
  }

  change() {
    const value = this.input.value;
    this.changeListener(this.input.value);

    if (this.reflect) {
      store.dispatch({
        type: 'DIRECT_SET',
        path: this.reflect,
        value,
      });
    } else {
      this.value = value;
      this.validate();
    }
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

  validate() {
    // Debounce calls made before object is ready
    if (this.group === null) return;
    let error = '';
    this.help = '';

    if (this.notNum(this.value)) {
      error = 'Value must be a number';
    } else if (this.notInRange(parseInt(this.value))) {
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
          value=${this.value}
          min=${this.range[0] ? this.range[0] : ''}
          max=${this.range[1] ? this.range[1] : ''}
          @input=${() => this.change()}
        />
        <small>${this.help}</small>
      </div>
    `;
  }
}
