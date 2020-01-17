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
  @property({ attribute: true }) primary: 'true' | 'false' = 'false';
  @property({ attribute: true }) disabled: 'true' | 'false' = 'false';

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
        width: fit-content;
        --icon-ink: var(--theme-primary);
      }
      :host([disabled='true']) {
        opacity: 0.5;
      }
      :host([primary='true']) .chip-button {
        background: var(--theme-primary);
        --icon-ink: #ffffff;
        color: white;
      }
      :host([disabled='true']) .chip-button {
        cursor: default;
      }
      :host([size='small']) .chip-button {
        font-size: 0.75rem;
        padding: 0.2rem 1rem 0.2rem 0.7rem;
      }
      .chip-button:hover {
        box-shadow: var(--theme-primary-shadow);
      }
      :host([disabled='true']) .chip-button:hover {
        box-shadow: none;
      }
      .chip-button mdi-icon {
        margin-right: 0.3rem;
        cursor: pointer;
      }
      :host([size='small']) .chip-button mdi-icon {
        margin-right: 0.5rem;
      }
    `;
  }

  render() {
    return html`
      <div class="chip-button">
            <mdi-icon
              .color=${css`var(--icon-ink)`}
              size=${this.size === 'small' ? 12 : 16}
              icon="${this.icon}"
            ></mdi-icon>
            <slot></slot>
          </div>
      </div>
    `;
  }
}
