import '../../components/app-spinner/app-spinner';
import './spell-list';
import './spell-search';
import './spell-info';

import { html, customElement, css, query, property } from 'lit-element';

import { AppModal } from '../../components/app-modal/app-modal';
import { SpellList } from './spell-list';
import { BaseInput } from '../base-input';
import { SpellSearch } from './spell-search';
import { SpellInfo } from './spell-info';

@customElement('spell-input')
export class SpellInput extends BaseInput<number[]> {
  @property() id: string = '';

  @query('app-modal') modal!: AppModal;
  @query('spell-list') list!: SpellList;
  @query('spell-search') search!: SpellSearch;
  @query('spell-info') info!: SpellInfo;

  // BaseInput Implementation
  getValue() {
    if (!this.list) return [];
    return [...this.list.value];
  }

  setValue(l: number[]) {
    this.list.value = [...l];
  }

  clearValue() {
    this.list.clear();
  }

  setup() {
    this.addEventListener('show-info', (e: Event) => {
      const infoRequest = e as CustomEvent<{ spellId: number }>;
      this.showInfo(infoRequest.detail.spellId);
    });
    this.addEventListener('show-search', () => {
      this.showSearch();
    });
    this.addEventListener('add-spell', (e: Event) => {
      const spellEvent = e as CustomEvent<{ spellId: number }>;
      this.addToList(spellEvent.detail.spellId);
    });
    this.addEventListener('remove-spell', (e: Event) => {
      const spellEvent = e as CustomEvent<{ spellId: number }>;
      this.removeFromList(spellEvent.detail.spellId);
    });
    this.search.excluded = [...this.list.value];
  }

  // SpellInput Implementation:
  show() {
    this.modal.show();
  }

  showSearch() {
    this.search.collapsed = false;
    this.info.expanded = false;
  }

  showInfo(id: number) {
    this.info.spellId = id;
    this.info.inList = this.list.value.includes(id);
    this.search.collapsed = true;
    this.info.expanded = true;
  }

  addToList(id: number) {
    this.list.add(id);
    this.spellListChanged();
  }

  removeFromList(id: number) {
    this.list.removeSpell(id);
    this.spellListChanged();
  }

  spellListChanged() {
    this.search.excluded = [...this.list.value];
    this.search.search();
    this.info.inList = this.list.value.includes(this.info.spellId);
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
      <app-modal>
        <div class="modal-container">
          <div class="spell-cards">
            <spell-search></spell-search>
            <spell-info></spell-info>
          </div>
          <spell-list
            @value-updated=${() => this.spellListChanged()}
          ></spell-list>
        </div>
      </app-modal>
    `;
  }
}
