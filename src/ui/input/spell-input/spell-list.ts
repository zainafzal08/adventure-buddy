import { property, customElement, html, css } from 'lit-element';
import {
  mdiDelete,
  mdiCheck,
  mdiHelpCircleOutline,
  mdiClose,
} from '@mdi/js';
import { SPELLS } from '../../../data/spells';
import { dispatch } from '../../../util';
import { BaseInput } from '../base-input';

/** Simple component that maintains a list of spells. */
@customElement('spell-list')
export class SpellList extends BaseInput<number[]> {
  @property() list: number[] = [];

  // BaseInput Implementation:
  getValue(): number[] {
    return this.list;
  }

  setValue(l: number[]) {
    this.list = l;
  }

  clearValue() {
    this.list = [];
  }

  // SpellList Implementation:
  removeFromList(spell: number) {
    this.value = this.value.filter(x => x !== spell);
  }

  add(spell: number) {
    this.value = [...this.value, spell];
  }

  clearList() {
    this.value = [];
  }

  done() {
    dispatch(this, 'modal-close');
  }

  showInfo(spell: number) {
    dispatch(this, 'show-info', { spellId: spell });
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 225px;
        height: 100%;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 16px 16px 8px 16px;
        display: flex;
        flex-direction: column;
        --header-height: 40px;
        --footer-height: 32px;
      }
      .header {
        height: var(--footer-height);
        width: 100%;
      }
      h1 {
        font-size: 1.2rem;
        color: #777;
        width: 100%;
        text-align: center;
        margin-top: 4px;
        padding-bottom: 12px;
        border-bottom: 2px solid #ebebeb;
      }
      .list {
        height: calc(
          100% - var(--header-height) - var(--footer-height)
        );
        overflow-y: scroll;
      }
      .footer {
        height: var(--footer-height);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .selected-spell {
        width: 100%;
        border-radius: 50px;
        border: 1px solid #ebebeb;
        display: flex;
        align-items: center;
        padding: 4px 12px;
        box-sizing: border-box;
        margin-bottom: 8px;
      }
      .selected-spell p {
        margin: 0;
        padding: 0;
        flex-grow: 1;
        color: #777;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9rem;
        white-space: nowrap;
        margin-right: 4px;
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

  renderListItem(spell: number) {
    return html`
      <div class="selected-spell">
        <p>${SPELLS[spell].name}</p>
        <div class="btn">
          <mdi-icon
            color="#777"
            icon=${mdiHelpCircleOutline}
            @click=${() => this.showInfo(spell)}
            size=${16}
          ></mdi-icon>
        </div>
        <div class="btn">
          <mdi-icon
            color="#777"
            icon=${mdiClose}
            @click=${() => this.removeFromList(spell)}
            size=${16}
          ></mdi-icon>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <h1>Selected Spells</h1>
      <div class="list">
        ${this.list.map(spell => this.renderListItem(spell))}
      </div>
      <div class="footer">
        <icon-btn
          size="small"
          color="var(--theme-primary)"
          icon=${mdiDelete}
          @click=${this.clearValue}
          ?disabled=${this.list.length === 0}
          >Clear</icon-btn
        >
        <icon-btn
          size="small"
          color="var(--theme-primary)"
          icon=${mdiCheck}
          ?primary=${true}
          @click=${this.done}
          >Done</icon-btn
        >
      </div>
    `;
  }
}
