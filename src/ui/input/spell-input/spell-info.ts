import {
  mdiClose,
  mdiHelpCircleOutline,
  mdiChevronRight,
  mdiDelete,
} from '@mdi/js';
import { dispatch, getIcon } from '../../../util';
import {
  LitElement,
  css,
  html,
  customElement,
  property,
  TemplateResult,
} from 'lit-element';
import { SPELLS } from '../../../data/spells';
import { getClassName, CLASSES } from '../../../data/classes';

function toCamelCase(s: string) {
  return s.replace(/ \w/g, (match: string) => {
    return match.replace(' ', '').toUpperCase();
  });
}

@customElement('spell-info')
export class SpellInfo extends LitElement {
  @property() spellId!: number;
  @property() inList: boolean = false;
  @property({ type: Boolean, attribute: true, reflect: true })
  expanded: boolean = false;

  getClassIcon(c: string) {
    c = c.trim().toLowerCase();
    return getIcon(CLASSES[c].icon);
  }

  renderClassChip(c: string) {
    c = c.trim().toLowerCase();
    return html`
      <div class="chip">
        <mdi-icon color="#777" icon=${this.getClassIcon(c)}></mdi-icon>
        <p>${getClassName(c)}</p>
      </div>
    `;
  }

  removeBtn() {
    return html`
      <icon-btn
        size="small"
        icon=${mdiDelete}
        ?primary=${true}
        ?danger=${true}
        @click=${() =>
          dispatch(this, 'remove-spell', { spellId: this.spellId })}
        >Remove</icon-btn
      >
    `;
  }

  addBtn() {
    return html`
      <icon-btn
        size="small"
        icon=${mdiChevronRight}
        ?primary=${true}
        @click=${() =>
          dispatch(this, 'add-spell', { spellId: this.spellId })}
        >Add</icon-btn
      >
    `;
  }
  fetchInfo() {
    const components: TemplateResult[] = [];
    if (!this.spellId) return null;
    const spell = SPELLS[this.spellId];
    components.push(html`
      <div class="heading">
        <h1>${spell.name}</h1>
        <p>Level ${spell.level} ${spell.school} Spell</p>
      </div>
    `);
    components.push(html`
      <div class="description">
        <div class="header">
          <h5>Description</h5>
        </div>
        <div class="body">
          <p>${spell.description}</p>
        </div>
      </div>
    `);
    const classes = spell.classes.split(',');
    components.push(html`
      <div class="footer">
        <div class="header">
          <h5>Can be cast by</h5>
        </div>
        <div class="list">
          ${classes.map(c => this.renderClassChip(c))}
        </div>
        ${this.inList ? this.removeBtn() : this.addBtn()}
      </div>
    `);
    const sideBar = [
      'concentration',
      'ritual',
      'casting time',
      'range',
      'components',
      'duration',
    ];
    for (const e of sideBar) {
      components.push(html`
        <div class=${e}>
          <p class="sh">${e}</p>
          <p class="sb">
            ${spell[toCamelCase(e) as keyof typeof spell]}
          </p>
        </div>
      `);
    }
    return components;
  }

  // LitElement Implementation
  static get styles() {
    return css`
      :host {
        --collapsed-spell-info-height: 50px;
        --top-bar-height: 50px;
        --section-header-height: 35px;
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
      /** Content */
      .content {
        display: none;
        width: 100%;
        height: calc(100% - var(--top-bar-height));
        box-sizing: border-box;
        padding: 0 40px 20px 40px;
        grid-template-rows: 70px repeat(6, 60px);
        grid-template-columns: 470px 200px;
        grid-template-areas:
          'heading heading'
          'desc concentration'
          'desc ritual'
          'desc casting'
          'desc range'
          'footer components'
          'footer duration';
      }
      /** Heading */
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
        font-size: 1.6rem;
        color: #444;
        padding: 0;
        margin: 0;
      }
      .content .heading p {
        color: #bbb;
        font-size: 1rem;
        padding: 0;
        margin: 0;
        margin-top: 6px;
      }
      .content * .header {
        height: var(--section-header-height);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content * .header h5 {
        margin: 0;
        padding: 0;
        color: #777;
        width: 100%;
        font-size: 14px;
      }

      /** Description */
      .content .description {
        grid-area: desc;
      }
      .content .description .body {
        height: calc(100% - var(--section-header-height));
        width: 100%;
        overflow-y: scroll;
      }
      .content .description p {
        width: 100%;
        margin: 0;
        height: 0;
        color: #999;
        font-size: 14px;
      }

      /** Footer */
      .content .footer {
        grid-area: footer;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
      .content .footer .list {
        width: 100%;
        height: 40px;
        display: flex;
        overflow-x: scroll;
      }
      .content .footer .list .chip {
        height: 16px;
        border: 2px solid #999;
        border-radius: 50px;
        padding: 4px 12px 4px 8px;
        display: flex;
        align-items: center;
        margin-right: 8px;
      }
      .content .footer .list .chip p {
        margin: 0;
        padding: 0;
        margin-left: 8px;
        font-size: 12px;
        margin-bottom: 2px;
        color: #8c8c8c;
      }
      .content .footer icon-btn {
        margin-top: 12px;
        margin-left: 0;
      }
      /** Side bar */
      .sh {
        color: #777;
        text-align: left;
        margin: 0;
        padding: 0;
        margin-top: 8px;
        margin-bottom: 6px;
        margin-left: 32px;
        font-size: 14px;
        font-weight: 400;
        text-transform: capitalize;
      }
      .sb {
        color: #c4c4c4;
        text-align: left;
        margin: 0;
        padding: 0;
        margin-left: 32px;
        font-size: 12px;
      }
      .concentration {
        grid-area: concentration;
      }
      .ritual {
        grid-area: ritual;
      }
      .casting {
        grid-area: casting;
      }
      .range {
        grid-area: range;
      }
      .components {
        grid-area: components;
      }
      .duration {
        grid-area: duration;
      }

      /** Help */
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
          <div class="btn" @click=${() =>
            dispatch(this, 'show-search')}>
            <mdi-icon
              color="#777"
              icon=${mdiClose}
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
