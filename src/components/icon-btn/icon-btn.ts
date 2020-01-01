import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';

@customElement('icon-btn')
export class IconBtn extends LitElement {
  @property() icon = '';
  @property({ attribute: true }) size: 'large' | 'small' = 'large';

  static get styles() {
    return css`
      .chip-button {
        padding: 0.3rem 0.5rem;
        border-radius: 15px;
        margin: 0 0.3rem;
        font-size: 0.9rem;
        color: var(--theme-primary);
        background: var(--theme-primary-light);
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.32s all;
      }
      :host([size='small']) .chip-button {
        font-size: 0.7rem;
        padding: 0.15rem 0.3rem;
      }
      .chip-button:hover {
        box-shadow: var(--theme-primary-shadow);
      }
      .chip-button mdi-icon {
        margin-right: 0.3rem;
        cursor: pointer;
      }
    `;
  }

  render() {
    return html`
      <div class="chip-button">
            <mdi-icon
              .color=${css`var(--theme-primary)`}
              size=${this.size === 'small' ? 12 : 16}
              icon="${this.icon}"
            ></mdi-icon>
            <slot></slot>
          </div>
      </div>
    `;
  }
}
