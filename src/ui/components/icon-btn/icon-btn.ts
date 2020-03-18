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
  @property({ attribute: true, type: Boolean })
  primary: boolean = false;
  @property({ attribute: true, type: Boolean })
  danger: boolean = false;
  @property({ attribute: true, type: Boolean })
  disabled: boolean = false;

  static get styles() {
    return css`
      :host {
        margin: 0 0.3rem;
      }
      .chip-button {
        padding: 0.3rem 0.7rem 0.3rem 0.5rem;
        border-radius: 15px;
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
      :host([danger]) .chip-button {
        color: var(--theme-emphasis-low);
        background: var(--theme-emphasis-low-light);
        --icon-ink: var(--theme-emphasis-low);
      }

      :host([disabled]) {
        opacity: 0.5;
      }
      :host([primary]) .chip-button {
        background: var(--theme-primary);
        --icon-ink: #ffffff;
        color: white;
      }
      :host([primary][danger]) .chip-button {
        background: var(--theme-emphasis-low);
        --icon-ink: #ffffff;
        color: white;
      }

      :host([disabled]) .chip-button {
        cursor: default;
      }
      :host([disabled]) .chip-button mdi-icon {
        cursor: default;
      }
      :host([size='small']) .chip-button {
        font-size: 0.75rem;
        padding: 0.2rem 1rem 0.2rem 0.7rem;
      }
      .chip-button:hover {
        box-shadow: var(--theme-primary-shadow);
      }
      :host([danger]) .chip-button:hover {
        box-shadow: var(--theme-emphasis-low-shadow);
      }

      :host([disabled]) .chip-button:hover {
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

  onClick(e: Event) {
    if (this.disabled) {
      e.stopPropagation();
    }
  }

  render() {
    return html`
      <div class="chip-button" @click=${this.onClick}>
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
