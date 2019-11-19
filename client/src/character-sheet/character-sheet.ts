import '../ui/section-title/section-title';
import '../error-page/error-page';

import { LitElement, html, customElement, css, property, query } from 'lit-element';

import { CharacterSheetData, getDatabase } from '../database';

@customElement('character-sheet')
export class CharacterSheet extends LitElement {
  @property() data!:CharacterSheetData;
  @property() id!:string;
  @property() state:string = 'loading';
  @query('.header .img-wrapper') imgWrapper!:HTMLDivElement;
  @query('#character-img') characterImg!:HTMLImageElement;
  @query('.character-name') characterName!:HTMLHeadingElement;

  static get styles() {
      return css`

      `;
  }

  connectedCallback() {
    super.connectedCallback();
    getDatabase().getCharacterSheet(this.id).then(sheet => {
      if (!sheet) {
        this.state = 'error';
        return;
      }
      this.data = sheet as CharacterSheetData;
      this.state = 'ready';
    })
  }
  render() {
    if (this.state === 'loading') {
      return html`<p>loading innit</p>`;
    } else if (this.state === 'error') {
      return html`<error-page message='Oh No! There is no character with that id'></error-page>`;
    }
    //TODO(zain): if unknown id show a error page.

    return html`
        <section-title
          title=${this.data.name}
          subtitle=${this.data.getDescriptor()}
          icon=${this.data.getIcon()}
        ></section-title>
    `;
  }
}