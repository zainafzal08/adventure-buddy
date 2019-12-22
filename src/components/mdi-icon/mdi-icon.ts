import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';

@customElement('mdi-icon')
export class MdiIcon extends LitElement {
  @property({ attribute: true, type: Number }) size: number = 16;
  @property({ attribute: true }) icon: string = '';
  @property({ attribute: true }) secondary: string = '';
  @property({ attribute: true }) color: string = '#000000';
  @property({ attribute: true, type: Boolean }) button: boolean = false;
  @property({ attribute: true }) background: string = 'none';

  static get styles() {
    return css``;
  }

  render() {
    let padding = 0;
    if (this.background !== 'none') {
      padding = 8;
    }
    return html`
      <style>
        :host {
          width: ${this.size + padding}px;
          height: ${this.size + padding}px;
          opacity: 0.7;
        }
        svg {
          width: ${this.size}px;
          height: ${this.size}px;
        }
        .container {
          width: calc(${this.size}px + ${padding}px);
          height: calc(${this.size}px + ${padding}px);
          background: ${this.background};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: ${this.button ? 'pointer' : 'default'};
          transition: all 0.1s;
          position: relative;
        }
        .container.button:hover {
          transform: scale(1.1);
        }
      </style>
      <div class="container ${this.button ? 'button' : ''}">
        <svg viewBox="0 0 24 24">
          <path d="${this.icon}" fill="${this.color}"></path>
        </svg>
      </div>
    `;
  }
}
