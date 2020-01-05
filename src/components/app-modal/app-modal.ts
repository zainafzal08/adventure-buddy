import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';

@customElement('app-modal')
export class AppModal extends LitElement {
  @property({ type: Boolean, attribute: true, reflect: true })
  shown: boolean = false;

  static get styles() {
    return css`
      :host {
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #00000030;
        align-items: center;
        justify-content: center;
        display: none;
        z-index: 999;
      }
      :host([shown]) {
        display: flex;
      }
    `;
  }

  firstUpdated() {
    this.addEventListener('modal-close', () => {
      this.shown = false;
    });
  }

  show() {
    this.shown = true;
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.shown = false;
    document.body.style.overflow = '';
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
