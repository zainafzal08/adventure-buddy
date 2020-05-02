import { html, customElement, css, property, query } from 'lit-element';
import { BaseInput } from '../base-input';

@customElement('extended-text-field')
export class ExtendedTextField extends BaseInput<string> {
  @property() name: string = 'extendedTextField';
  @property({ type: Number }) rows: number = 5;

  @query('textarea') textarea!: HTMLTextAreaElement;

  // BaseInput Implementation:
  setValue(s: string) {
    if (!this.textarea) return;
    this.textarea.value = s;
  }

  getValue() {
    if (!this.textarea) return '';
    return this.textarea.value;
  }

  clearValue() {
    if (!this.textarea) return;
    this.textarea.value = '';
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      label {
        font-size: 0.8rem;
        color: #bbb;
      }
      textarea {
        width: 100%;
        margin-top: 8px;
        resize: none;
        outline: none;
        border: none;
        border-bottom: 2px solid #ebebeb;
        font-family: var(--font-stack);
        color: #777;
        font-size: 0.9rem;
      }
    `;
  }

  render() {
    return html`
      <label>${this.name}</label>
      <textarea rows=${this.rows}></textarea>
    `;
  }
}
