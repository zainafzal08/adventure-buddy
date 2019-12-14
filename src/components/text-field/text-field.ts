import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';

@customElement('text-field')
export class TextField extends LitElement {
  @property({ attribute: true }) name: string = 'textField';
  @property() field: string = 'text';

  @query('input') input!: HTMLInputElement;

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

      .group input[type='text'] {
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
      .group:focus-within input[type='text'] {
        border-bottom: 2px solid var(--theme-primary);
      }
    `;
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          type="text"
          @input=${() => {
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
