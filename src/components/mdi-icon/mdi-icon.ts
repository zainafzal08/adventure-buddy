import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';

@customElement('mdi-icon')
export class MdiIcon extends LitElement {
  @property({ attribute: true }) size: number = 16;
  @property({ attribute: true }) icon: string = '';
  @property({ attribute: true }) color: string = '#000000';

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <style>
        :host {
          width: ${this.size}px;
          height: ${this.size}px;
        }
        svg {
          width: ${this.size}px;
          height: ${this.size}px;
        }
      </style>
      <svg viewBox="0 0 24 24">
        <path d="${this.icon}" fill="${this.color}"></path>
      </svg>
    `;
  }
}
