import { mdiClose, mdiHelpCircleOutline } from '@mdi/js';
import { dispatch } from '../../../util';
import {
  LitElement,
  css,
  html,
  customElement,
  property,
  TemplateResult,
} from 'lit-element';
import { SPELLS } from '../../../data/spells';

@customElement('spell-info')
export class SpellInfo extends LitElement {
  @property() spellId!: number;
  @property({ type: Boolean, attribute: true, reflect: true })
  expanded: boolean = false;

  fetchInfo() {
    const components: TemplateResult[] = [];
    if (this.spellId === null) return null;
    const spell = SPELLS[this.spellId];
    components.push(html`
      <div class="heading">
        <h1>${spell.name}</h1>
        <p>Level ${spell.level} ${spell.school} Spell</p>
      </div>
    `);
    return components;
  }

  // LitElement Implementation
  static get styles() {
    return css`
      :host {
        --collapsed-spell-info-height: 50px;
        --top-bar-height: 50px;
        width: 100%;
        height: var(--collapsed-spell-info-height);
        border-radius: 15px;
        background: white;
        box-shadow: var(--soft-box-shadow);
      }
      :host([expanded]) {
        height: 500px;
      }
      .top-bar {
        display: none;
        width: 100%;
        height: var(--top-bar-height);
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 8px 16px;
        align-items: center;
      }
      .content {
        display: none;
        width: 100%;
        height: calc(100% - var(--top-bar-height));
        box-sizing: border-box;
        padding: 0 40px 40px 40px;
        grid-template-rows: 100px repeat(7, auto);
        grid-template-columns: auto 200px;
        grid-template-areas:
          'heading heading'
          'desc concentration'
          'desc ritual'
          'desc casting'
          'desc range'
          'footer components'
          'footer duration';
      }
      .content .heading {
        grid-area: heading;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
      .content .heading h1 {
        color: #444;
        padding: 0;
        margin: 0;
      }
      .content .heading p {
        color: #bbb;
        padding: 0;
        margin: 0;
        margin-top: 6px;
      }
      .help-msg {
        padding: 8px 20px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        color: #999;
        display: flex;
        align-items: center;
      }
      .help-msg mdi-icon {
        margin: 0 6px;
        margin-top: 1px;
      }
      :host([expanded]) .help-msg {
        display: none;
      }
      :host([expanded]) .top-bar {
        display: flex;
      }
      :host([expanded]) .content {
        display: grid;
      }
      .btn {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 4px;
      }
      .btn:hover {
        background: #ebebeb;
      }
    `;
  }

  render() {
    return html`
        <div class="top-bar">
          <div class="btn">
            <mdi-icon
              color="#777"
              icon=${mdiClose}
              @click=${() => dispatch(this, 'show-search')}
              size=${20}
            ></mdi-icon>
          </div>
        </div>
        <div class="help-msg">
          Click on the
          <mdi-icon
            icon=${mdiHelpCircleOutline}
            color="#777"
          ></mdi-icon>
          to see the full spell card.
        </div>
        <div class="content">
          ${this.fetchInfo()}
        </div>
      </div>
    `;
  }
}
