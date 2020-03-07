import {
  html,
  customElement,
  css,
  property,
  query,
  LitElement,
} from 'lit-element';

@customElement('text-field')
export class TextField extends LitElement {
  @property() name: string = 'textField';
  @property() placeholder: string = 'Enter Text Here';
  @property() initial: string = '';
  @property() id: string = '';
  @property({ type: Boolean }) canBeEmpty: boolean = false;
  @property() private help: string = '';

  @query('input') input!: HTMLInputElement;

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    if (!saved) {
      this.value = this.initial;
      return;
    }
    this.value = saved;
    this.validate();
  }

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

  get value() {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
  }

  validate() {
    this.help = '';
    if (!this.canBeEmpty && this.value === '') {
      this.help = "This field can't be empty";
    }
  }

  isValid() {
    return this.help === '';
  }

  clear() {
    this.value = this.initial;
    localStorage.removeItem(`saved-input-value(${this.id})`);
  }

  updateValue() {
    this.backup();
    this.validate();
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

  backup() {
    if (this.id === '') return;
    localStorage.setItem(`saved-input-value(${this.id})`, this.value);
  }

  render() {
    return html`
      <div class="group" @input=${this.updateValue}>
        <label for="input">${this.name}</label>
        <input type="text" placeholder=${this.placeholder} />
        <small> ${this.help} </small>
      </div>
    `;
  }
}
