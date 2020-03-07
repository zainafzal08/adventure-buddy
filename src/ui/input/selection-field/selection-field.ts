import {
  html,
  customElement,
  css,
  property,
  LitElement,
  query,
} from 'lit-element';

@customElement('selection-field')
export class SelectionField extends LitElement {
  @property() name: string = 'selectionField';
  @property() options: string[] = [];
  @property() id: string = '';

  @query('select') select!: HTMLSelectElement;

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);

    if (!saved) {
      this.value = this.options[0];
      return;
    }

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

  get value(): string {
    return this.select.value;
  }

  set value(value: string) {
    this.select.value = value;
  }

  isValid() {
    return true;
  }

  clear() {
    this.value = this.options[0];
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
