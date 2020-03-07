import '../../components/app-spinner/app-spinner';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import { mdiMagnify } from '@mdi/js';
import * as mdiAll from '@mdi/js';

import { AppModal } from '../../components/app-modal/app-modal';
import timeHuman from '../../../assets/humaaans/time.svg';
import lostHuman from '../../../assets/humaaans/lost.svg';
import { navigate } from '../../../router/navigate';
import { SpellDescription, SPELLS } from '../../../data/spells';
import { CLASSES } from '../../../data/classes';
import { getArtificer } from '../../../data/artificer';

const TABLE_FIELDS = ['Name', 'Level', 'Range', 'Classes', 'Actions'];

@customElement('spell-input')
export class SpellInput extends LitElement {
  @property() list: number[] = [];
  @property() results: number[] | null = null;
  @property() stopIndex: number = 0;

  @query('app-modal') spellSearchCard!: AppModal;
  @query('input') input!: HTMLInputElement;
  @query('.results') resultsDiv!: HTMLDivElement;

  static get styles() {
    return css`
      :host {
        --picked-card-width: 250px;
      }
      .modal-container {
        width: calc(750px + 25px + var(--picked-card-width));
        height: 500px;
        display: flex;
      }
      .search-card {
        width: 750px;
        height: 100%;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        --search-field-height: 50px;
        --table-header-height: 45px;
        margin-right: 25px;
      }

      .search-field {
        width: 100%;
        height: var(--search-field-height);
        background: #f2f2f2;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        box-sizing: border-box;
        padding: 8px 16px;
        display: flex;
        align-items: center;
      }
      .table-heading {
        width: calc(100% - 64px);
        margin: 0 32px;
        height: var(--table-header-height);
        display: grid;
        align-items: flex-end;
        grid-template-columns: 25% 10% 15% 25% auto;
      }
      .table-heading h5 {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #999;
        font-size: 0.8rem;
        padding: 0 4px;
        padding-bottom: 8px;
        border-bottom: 2px solid #ebebeb;
      }
      :host([inactive]) .table-heading {
        opacity: 0.4;
      }
      .results {
        width: 100%;
        height: calc(
          100% - var(--search-field-height) - var(--table-header-height) -
            16px
        );
        box-sizing: border-box;
        padding: 16px 32px 0 32px;
        margin-bottom: 16px;
        overflow-y: scroll;
      }
      .backdrop {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .backdrop img {
        height: 250px;
        opacity: 0.7;
      }
      .list-backdrop {
        height: 100%;
        width: 100%;
      }
      .backdrop p.push-down {
        margin-top: 16px;
      }
      .backdrop p {
        margin: 0;
        margin-top: 8px;
        padding: 0;
        width: 400px;
        color: #bbb;
        text-align: center;
        font-size: 0.8rem;
      }
      input {
        flex-grow: 1;
        margin: 0 16px;
        background: none;
        outline: none;
        border: none;
        font-size: 1.1rem;
        color: #555;
      }
      input:focus {
        outline: none;
      }
      input::placeholder {
        color: #bbb;
      }
      a {
        color: #bbb;
      }
      .results .row {
        width: 100%;
        margin-top: 12px;
        display: grid;
        grid-template-columns: 25% 10% 15% 25% auto;
      }
      .results .row p {
        color: #444;
        font-size: 0.8rem;
        box-sizing: border-box;
        margin: 0;
        padding: 0 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .results .row .classes {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .results .row .classes * {
        margin-right: 4px;
      }
      .results .row .classes mdi-icon:first-child {
        margin-left: 4px;
      }
      .results .row .actions {
        display: flex;
      }
      .results .row .actions icon-btn:first-child {
        margin-left: 0;
      }

      app-spinner {
        margin: 12px 0;
      }

      .picked-card {
        width: var(--picked-card-width);
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
      .picked-card .header {
        height: var(--footer-height);
        width: 100%;
      }
      .picked-card h1 {
        font-size: 1.2rem;
        color: #777;
        width: 100%;
        text-align: center;
        margin-top: 4px;
        padding-bottom: 12px;
        border-bottom: 2px solid #ebebeb;
      }
      .picked-card .list {
        height: calc(
          100% - var(--header-height) - var(--footer-height)
        );
        overflow-y: scroll;
      }
      .picked-card .footer {
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
      .selected-spell mdi-icon:first-child {
        margin-right: 6px;
      }
      .push-left {
        margin-right: 4px;
      }
    `;
  }

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    this.resultsDiv!.addEventListener('scroll', () => {
      this.scrollUpdated();
    });
    this.toggleAttribute('inactive', true);
    if (!saved) {
      return;
    }
    this.list = JSON.parse(saved);
  }

  backup() {
    localStorage.setItem(
      `saved-input-value(${this.id})`,
      JSON.stringify(this.list)
    );
  }

  get value(): number[] {
    return this.list;
  }

  set value(list: number[]) {
    this.list = [...list];
  }

  isValid() {
    return true;
  }

  clear() {
    localStorage.removeItem(`saved-input-value(${this.id})`);
    this.list = [];
  }

  showSpellSearchCard() {
    this.spellSearchCard.show();
  }

  hideSpellSearchCard() {
    this.spellSearchCard.hide();
  }

  zeroState() {
    return html`
      <div class="backdrop">
        <img src=${timeHuman} />
        <p>
          Type in the search box above to get started
        </p>
        <p>
          You can search faster with filters,
          <a
            href="#"
            @click=${() => {
              this.spellSearchCard.hide();
              navigate('/help');
            }}
            >Learn More</a
          >
        </p>
      </div>
    `;
  }

  emptyState() {
    return html`
      <div class="backdrop">
        <img src=${lostHuman} />
        <p class="push-down">Couldn't find that spell!</p>
      </div>
    `;
  }

  search() {
    this.toggleAttribute('inactive', false);
    const query = this.input.value.toLowerCase();
    if (query === '') {
      this.results = null;
      this.toggleAttribute('inactive', true);
      return;
    }
    const artificer = getArtificer();
    this.results = artificer.searchSpells(query, this.list);
    this.stopIndex = 25;
    this.scrollToTop();
    if (this.results.length == 0) {
      this.toggleAttribute('inactive', true);
    }
  }

  getIcon(c: string) {
    const icon = CLASSES[c.toLowerCase().trim()].icon;
    // Captilize.
    let iconStr = icon.substr(0, 1).toUpperCase() + icon.substr(1);
    // To camelcase.
    iconStr = iconStr.replace(/\-\w/g, (match: string) => {
      return match.replace('-', '').toUpperCase();
    });
    return (mdiAll as { [k in string]: string })[`mdi${iconStr}`];
  }

  addToList(id: number) {
    this.list.push(id);
    this.search();
  }

  clearList() {
    this.list = [];
    this.search();
  }

  renderRow(result: SpellDescription) {
    return html`
      <div class="row">
        <p>${result.name}</p>
        <p>${result.level}</p>
        <p>${result.range}</p>
        <div class="classes">
          ${result.classes.split(',').map(
            c =>
              html`
                <mdi-icon
                  color="#444"
                  icon=${this.getIcon(c)}
                ></mdi-icon>
              `
          )}
        </div>
        <div class="actions">
          <icon-btn
            size="small"
            .color=${css`var(--theme-primary)`}
            icon=${mdiAll.mdiHelpCircleOutline}
            >Info</icon-btn
          >
          <icon-btn
            size="small"
            .color=${css`var(--theme-primary)`}
            icon=${mdiAll.mdiChevronRight}
            @click=${() => this.addToList(result.id)}
            >Add</icon-btn
          >
        </div>
      </div>
    `;
  }

  scrollUpdated() {
    const scrollTop = this.resultsDiv!.scrollTop;
    const scrollPos = scrollTop + 400;
    const scrollEnd = this.resultsDiv.scrollHeight;
    if (scrollPos + 100 > scrollEnd) {
      this.stopIndex += 25;
    }
  }

  loadingAnimation() {
    return html`
      <app-spinner></app-spinner>
    `;
  }

  scrollToTop() {
    this.resultsDiv!.scrollTop = 0;
  }

  renderResults() {
    if (this.results == null) {
      return this.zeroState();
    } else if (this.results.length == 0) {
      return this.emptyState();
    }

    const shownResults = this.results.slice(0, this.stopIndex);

    return html`
      ${shownResults.map(i => this.renderRow(SPELLS[i]))}
      ${this.stopIndex >= this.results.length
        ? null
        : this.loadingAnimation()}
    `;
  }

  renderPickedList() {
    const selectedSpells: TemplateResult[] = [];
    for (const spell of this.list) {
      selectedSpells.push(html`
        <div class="selected-spell">
          <p>${SPELLS[spell].name}</p>
          <mdi-icon
            class="push-left"
            color="#777"
            icon=${mdiAll.mdiHelpCircleOutline}
            size=${16}
          ></mdi-icon>
          <mdi-icon
            color="#777"
            icon=${mdiAll.mdiClose}
            size=${16}
          ></mdi-icon>
        </div>
      `);
    }
    return selectedSpells;
  }

  render() {
    return html`
      <p @click=${this.showSpellSearchCard}>add</p>
      <app-modal>
        <div class="modal-container">
          <div class="search-card">
            <div class="search-field" @input=${this.search}>
              <mdi-icon
                icon=${mdiMagnify}
                size=${26}
                color="#BBB"
              ></mdi-icon>
              <input type="search" placeholder="Search away!" />
            </div>
            <div class="table-heading">
              ${TABLE_FIELDS.map(
                f =>
                  html`
                    <h5>${f}</h5>
                  `
              )}
            </div>
            <div class="results">
              ${this.renderResults()}
            </div>
          </div>
          <div class="picked-card">
            <h1>Selected Spells</h1>
            <div class="list">
              ${this.renderPickedList()}
            </div>
            <div class="footer">
              <icon-btn
                size="small"
                .color=${css`var(--theme-primary)`}
                icon=${mdiAll.mdiDelete}
                @click=${this.clearList}
                >Clear</icon-btn
              >
              <icon-btn
                size="small"
                .color=${css`var(--theme-primary)`}
                icon=${mdiAll.mdiCheck}
                ?primary=${true}
                @click=${this.hideSpellSearchCard}
                >Done</icon-btn
              >
            </div>
          </div>
        </div>
      </app-modal>
    `;
  }
}
