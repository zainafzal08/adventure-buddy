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
  @property() id: string = '';
  @query('input') input!: HTMLInputElement;

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    if (!saved) return;
    this.value = saved;
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
    `;
  }

  get value() {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
  }

  isValid() {
    return this.value !== '';
  }

  clear() {
    this.value = '';
    localStorage.removeItem(`saved-input-value(${this.id})`);
  }

  updateValue() {
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

  backup() {
    if (this.id === '') return;
    localStorage.setItem(`saved-input-value(${this.id})`, this.value);
  }

  render() {
    return html`
      <div class="group" @input=${this.updateValue}>
        <label for="input">${this.name}</label>
        <input type="text" placeholder=${this.placeholder} />
      </div>
    `;
  }
}
