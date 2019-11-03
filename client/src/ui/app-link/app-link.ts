import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('app-link')
export class AppLink extends LitElement {
  @property({type: String}) target = '/';

  static get styles() {
    // Theme definition
    return css`
      :host {
        cursor: pointer;
      }
    `;
  }

  private navigate() {
    const event = new CustomEvent('navigate', {
      bubbles: true,
      composed: true,
      detail: {
        target: this.target
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <a @click=${this.navigate}>
        <slot></slot>
      </a>
    `;
  }
}










