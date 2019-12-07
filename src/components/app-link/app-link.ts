import {
  LitElement,
  html,
  customElement,
  property,
  css,
} from 'lit-element';
import { getNavigateEvent } from '../../util';
@customElement('app-link')
export class AppLink extends LitElement {
  @property({ type: String }) target = '/';
  @property({ type: String }) tag: 'a' | 'div' = 'a';
  static get styles() {
    return css`
      :host {
        cursor: pointer;
      }
    `;
  }

  private navigate() {
    this.dispatchEvent(getNavigateEvent(this.target));
  }

  render() {
    return this.tag === 'a'
      ? html`
          <a @click=${this.navigate}><slot></slot></a>
        `
      : html`
          <div @click=${this.navigate}><slot></slot></div>
        `;
  }
}
