import '../ui/section-title/section-title';

import { LitElement, html, customElement, css, property, query } from 'lit-element';

import icons from '../assets/icons/*.svg';

@customElement('character-sheet')
export class CharacterSheet extends LitElement {
  @property({type: String}) theme = 'peach';
  @property({type: Object}) data = {
    class: 'fighter',
    name: 'Blathenor Stegfire',
    race: 'Wood Elf',
    level: 7
  };
  @query('.header .img-wrapper') imgWrapper!:HTMLDivElement;
  @query('#character-img') characterImg!:HTMLImageElement;
  @query('.character-name') characterName!:HTMLHeadingElement;
  
  static get styles() {
      return css`
          :host {
            --page-vpad: 16px;
            --page-hpad: 48px;
          }
          .page {
            width: calc(100% - 2 * var(--page-hpad));
            padding: var(--page-vpad) var(--page-hpad);
            height: calc(100vh - var(--page-hpad));
            background: #FAFAFA;
          }

          /* lower then 800 px */
          @media (max-width: 500px) {
            :host {
              --page-vpad: 16px;
              --page-hpad: 32px;
              --header-img-size: 80px;
              --header-img-hpad: 8px;
              --header-img-pad: 20px;
              --character-name-hpad: 0px;
              --character-name-font-size: 1.5rem;
            }
          }
      `;
  }

  private getDescriptor() {
    const d = this.data;
    return `Level ${d.level} ${d.race} ${d.class}`;
  }

  private getIcon() {
    return icons[this.data.class];
  }

  render() {
    return html`
      <div class="page">
        <section-title
            title=${this.data.name}
            subtitle=${this.getDescriptor()}
            icon=${this.getIcon()}
          ></section-title>
          <character-quick-stats></character-quick-stats>
      </div>
    `;
  }
}