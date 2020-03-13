import '../../components/app-spinner/app-spinner';
import './spell-list';
import './spell-search';
import './spell-info';

import { html, customElement, css, query } from 'lit-element';

import { AppModal } from '../../components/app-modal/app-modal';
import { SpellList } from './spell-list';
import { BaseInput } from '../base-input';
import { SpellSearch } from './spell-search';
import { SpellInfo } from './spell-info';

@customElement('spell-input')
export class SpellInput extends BaseInput<number[]> {
  @query('app-modal') modal!: AppModal;
  @query('spell-list') list!: SpellList;
  @query('spell-search') search!: SpellSearch;
  @query('spell-info') info!: SpellInfo;

  // BaseInput Implementation
  getValue() {
    return this.list.value;
  }

  setValue(l: number[]) {
    this.list.value = l;
  }

  clearValue() {
    this.list.clear();
  }

  // SpellInput Implementation:
  showSpellSearchCard() {
    this.modal.show();
  }

  showSearch() {
    this.search.collapsed = false;
    this.info.expanded = false;
  }

  showInfo(id: number) {
    this.info.spellId = id;
    this.search.collapsed = true;
    this.info.expanded = true;
  }

  addToList(id: number) {
    this.list.add(id);
    this.search.excluded = [...this.list.value];
    this.search.search();
  }

  firstUpdated() {
    this.addEventListener('show-info', (e: Event) => {
      const infoRequest = e as CustomEvent<{ spellId: number }>;
      this.showInfo(infoRequest.detail.spellId);
    });
    this.addEventListener('show-search', () => {
      this.showSearch();
    });
    this.addEventListener('add-spell', (e: Event) => {
      const addSpellEvent = e as CustomEvent<{ spellId: number }>;
      this.addToList(addSpellEvent.detail.spellId);
    });
    this.search.excluded = [...this.list.value];
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      .modal-container {
        width: calc(750px + 25px + var(--picked-card-width));
        height: 575px;
        display: flex;
      }
      .spell-cards {
        width: 750px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 25px;
      }
    `;
  }

  render() {
    return html`
      <p @click=${this.showSpellSearchCard}>add</p>
      <app-modal>
        <div class="modal-container">
          <div class="spell-cards">
            <spell-search></spell-search>
            <spell-info></spell-info>
          </div>
          <spell-list></spell-list>
        </div>
      </app-modal>
    `;
  }
}
