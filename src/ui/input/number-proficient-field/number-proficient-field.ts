import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { ModifiableValue } from '../../../data/CharacterSheet';

@customElement('number-proficient-field')
export class NumberProficientField extends LitElement {
  @property({ attribute: true }) name: string = 'numberProficientField';
  @property() id: string = '';

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

  notNum(v: string) {
    return isNaN(parseInt(v));
  }

  validate() {
    this.group.classList.toggle(
      'invalid',
      this.notNum(this.input.value)
    );
  }

  get value() {
    let v;
    if (!this.input) {
      v = 0;
    } else {
      v = parseInt(this.input.value);
      if (isNaN(v)) v = 0;
    }
    return {
      value: v,
      proficient: this.hasAttribute('proficient'),
    };
  }

  set value(score: ModifiableValue) {
    this.input.value = score.value.toString();
    this.toggleAttribute('proficient', score.proficient);
    this.updateValue();
  }

  clear() {
    this.value = {
      value: 0,
      proficient: false,
    };
    localStorage.removeItem(`saved-input-value(${this.id})`);
  }

  updateValue() {
    this.validate();
    this.backup();
    this.dispatchEvent(
      new CustomEvent('value-updated', {
        detail: {
          id: this.id,
          value: this.value,
        },
        composed: true,
        bubbles: true,
      })
    );
  }

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    if (!saved) {
      this.value = {
        value: 0,
        proficient: false,
      };
      return;
    }
    this.value = JSON.parse(saved);
  }

  backup() {
    localStorage.setItem(
      `saved-input-value(${this.id})`,
      JSON.stringify(this.value)
    );
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          id="input"
          type="number"
          @input=${() => this.updateValue()}
        />
        <div class="footer">
          <div
            class="prof-button"
            @click=${() => {
              this.toggleAttribute('proficient');
              this.updateValue();
            }}
          >
            Proficient
          </div>
        </div>
      </div>
    `;
  }
}
