import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { AppState } from '../../../redux/reducer';
import { store } from '../../../redux/store';
import { connect } from 'pwa-helpers';

type Field = { proficient: boolean; value: string };

@customElement('number-proficient-field')
export class NumberFieldProficient extends connect(store)(LitElement) {
  // User facing
  @property({ attribute: true }) name: string = 'numberProficientField';
  @property() reflect: string = '';
  @property() data: Field = {
    proficient: false,
    value: '0',
  };
  @property() changeListener: (v: Field) => void = () => {};

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
      /* Default label. */
      label {
        font-size: 0.8rem;
        color: #aaa;
        text-transform: capitalize;
      }
      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }
      .group.invalid label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      .group.invalid:focus-within label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      /* Proficient label. */
      :host([proficient]) label {
        color: var(--theme-emphasis);
        opacity: 0.7;
      }
      :host([proficient]) .group:focus-within label {
        color: var(--theme-emphasis);
        opacity: 1;
      }
      :host([proficient]) .group.invalid label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      :host([proficient]) .group.invalid:focus-within label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      /* Default input. */
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
      /* Proficient input. */
      :host([proficient]) .group input {
        border-bottom: 2px solid var(--theme-emphasis);
      }
      :host([proficient]) .group:focus-within input {
        border-bottom: 2px solid var(--theme-emphasis);
      }
      :host([proficient]) .group.invalid:focus-within input {
        border-bottom: 2px solid var(--theme-emphasis-low);
      }
      :host([proficient]) .group.invalid input {
        border-bottom: 2px solid var(--theme-emphasis-low);
      }

      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .footer {
        width: 100%;
        height: 32px;
        margin-top: 8px;
      }
      .prof-button {
        width: fit-content;
        padding: 0.1rem 0.5rem;
        background: #ebebeb;
        color: #bbb;
        border-radius: 15px;
        font-size: 0.5rem;
        cursor: pointer;
      }
      .prof-button:hover {
        background: var(--theme-emphasis);
        box-shadow: var(--theme-emphasis-shadow);
        color: white;
        opacity: 0.8;
      }
      :host([proficient]) .prof-button:hover {
        opacity: 1;
        box-shadow: var(--theme-emphasis-shadow-high);
      }
      :host([proficient]) .prof-button {
        background: var(--theme-emphasis);
        box-shadow: var(--theme-emphasis-shadow);
        color: white;
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
    this.data = val === undefined ? '' : val;
    // Actually update the input field to match.
    if (this.input && this.data.value !== '')
      this.input.value = this.data.value;
    this.validate();
  }

  change() {
    const data = {
      proficient: this.hasAttribute('proficient'),
      value: this.input.value,
    };
    this.changeListener(data);

    if (this.reflect) {
      store.dispatch({
        type: 'DIRECT_SET',
        path: this.reflect,
        value: data,
      });
    } else {
      this.data = data;
      this.validate();
    }
  }

  notNum(v: string) {
    return isNaN(parseInt(v));
  }

  validate() {
    // Debounce calls made before object is ready
    if (this.group === null) return;
    this.group.classList.toggle(
      'invalid',
      this.notNum(this.data.value)
    );
  }

  profToggle() {
    return html`
      <div
        class="prof-button"
        @click=${() => {
          this.toggleAttribute('proficient');
          this.change();
        }}
      >
        Proficient
      </div>
    `;
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          id="input"
          type="number"
          value=${this.data.value}
          @input=${() => this.change()}
        />
        <div class="footer">
          ${this.profToggle()}
        </div>
      </div>
    `;
  }
}
