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

  static get styles() {
    return css`
      .chip-button {
        padding: 0.3rem 0.5rem;
        border-radius: 15px;
        margin: 0 0.3rem;
        color: var(--theme-primary);
        background: var(--theme-primary-light);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.32s all;
      }
      .chip-button:hover {
        box-shadow: 1px 2px 4px var(--theme-primary-shadow);
      }
      .chip-button mdi-icon {
        margin-right: 0.3rem;
      }
    `;
  }

  render() {
    return html`
      <div class="chip-button">
            <mdi-icon
              .color=${css`var(--theme-primary)`}
              icon="${this.icon}"
            ></mdi-icon>
            <slot></slot>
          </div>
      </div>
    `;
  }
}
