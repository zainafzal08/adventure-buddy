import '../section-title/section-title';
import '../app-link/app-link';

import { LitElement, html, customElement, css } from 'lit-element';
import { CharacterSheetData } from '../../database';

@customElement('character-preview')
export class CharacterPreview extends LitElement {
  private characterData!:CharacterSheetData;

  constructor(data:CharacterSheetData) {
    super();
    this.characterData = data;
  }

  static get styles() {
      return css`
        .card {
          width: 300px;
          height: 56px;
          padding: 10px;
          background: white;
          border: 2px solid #EBEBEB;
          border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
        }
        small {
          color: #777;
          font-size: .7rem;
        }
        h1 {
          color: #444;
          margin: 0;
          font-size: 1.1rem;
        }
      `;
  }

  render() {
    return html`
      <app-link target=${`/character/${this.characterData.id}`}>
        <div class="card">
          <section-title
            title=${this.characterData.name}
            subtitle=${this.characterData.getDescriptor()}
            icon=${this.characterData.getIcon()}
            size="small"
          >
          </section-title>
        </div>
      </app-link>
    `;
  }
}










