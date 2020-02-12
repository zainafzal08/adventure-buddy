import { html, customElement, css, property } from 'lit-element';
import { BaseInput } from '../base-input/base-input';

@customElement('text-field')
export class TextField extends BaseInput {
  @property() name: string = 'textField';

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
    `;
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input type="text" />
      </div>
    `;
  }
}
