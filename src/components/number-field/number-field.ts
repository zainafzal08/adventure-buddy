import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';

@customElement('number-field')
export class NumberField extends LitElement {
  @property({ attribute: true }) name: string = 'numberField';
  @property() field: string = 'number';
  @property() range: [number | null, number | null] = [null, null];

  @query('input') input!: HTMLInputElement;
  @query('.group') group!: HTMLDivElement;

  private err: string = '';

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
        margin-top: 2rem;
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
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
        width: 80%;
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
    `;
  }

  isValid() {
    const v = parseInt(this.input.value);
    let valid = true;
    if (this.range[0]) {
      valid = valid && v >= this.range[0];
    }
    if (this.range[1]) {
      valid = valid && v <= this.range[1];
    }
    if (!valid) {
      this.err = `Value must be in range [${this.range[0]}, ${this.range[1]}]`;
    }
    return valid;
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
          @input=${() => {
            this.group.classList.toggle('invalid', !this.isValid());
            this.dispatchEvent(
              new CustomEvent('mutation', {
                bubbles: true,
                composed: true,
                detail: [
                  {
                    field: this.field,
                    value: this.input.value,
                  },
                ],
              })
            );
          }}
        />
      </div>
    `;
  }
}
