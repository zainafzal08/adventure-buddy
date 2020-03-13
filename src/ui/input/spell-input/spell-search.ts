import {
  mdiMagnify,
  mdiHelpCircleOutline,
  mdiChevronRight,
} from '@mdi/js';
import {
  LitElement,
  css,
  html,
  customElement,
  property,
  query,
} from 'lit-element';
import { SpellDescription, SPELLS } from '../../../data/spells';
import { getIcon, dispatch } from '../../../util';
import { navigate } from '../../../router/navigate';
import { getArtificer } from '../../../data/artificer';
import timeHuman from '../../../assets/humaaans/time.svg';
import lostHuman from '../../../assets/humaaans/lost.svg';
import { CLASSES } from '../../../data/classes';

const TABLE_FIELDS = ['Name', 'Level', 'Range', 'Classes', 'Actions'];

@customElement('spell-search')
export class SpellSearch extends LitElement {
  @property({ attribute: true, reflect: true, type: Boolean })
  collapsed: boolean = false;
  @property() stopIndex: number = 0;

  @property() private results: number[] | null = null;
  @property() excluded: number[] = [];

  @query('input') input!: HTMLInputElement;
  @query('.results') resultsDiv!: HTMLDivElement;

  // SpellSearch Implementation
  scrollUpdated() {
    const scrollTop = this.resultsDiv!.scrollTop;
    const scrollPos = scrollTop + 400;
    const scrollEnd = this.resultsDiv.scrollHeight;
    if (scrollPos + 100 > scrollEnd) {
      this.stopIndex += 25;
    }
  }

  scrollToTop() {
    this.resultsDiv!.scrollTop = 0;
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
    this.results = artificer.searchSpells(query, this.excluded);
    this.stopIndex = 25;
    this.scrollToTop();
    if (this.results.length == 0) {
      this.toggleAttribute('inactive', true);
    }
  }

  firstUpdated() {
    this.resultsDiv!.addEventListener('scroll', () => {
      this.scrollUpdated();
    });
    this.toggleAttribute('inactive', true);
  }

  getClassIcon(c: string) {
    c = c.trim().toLowerCase();
    return getIcon(CLASSES[c].icon);
  }

  // LitElement Implementation
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
                  icon=${this.getClassIcon(c)}
                ></mdi-icon>
              `
          )}
        </div>
        <div class="actions">
          <icon-btn
            size="small"
            .color=${css`var(--theme-primary)`}
            icon=${mdiHelpCircleOutline}
            @click="${() =>
              dispatch(this, 'show-info', { spellId: result.id })}}"
            >Info</icon-btn
          >
          <icon-btn
            size="small"
            .color=${css`var(--theme-primary)`}
            icon=${mdiChevronRight}
            @click=${() =>
              dispatch(this, 'add-spell', { spellId: result.id })}
            >Add</icon-btn
          >
        </div>
      </div>
    `;
  }

  loadingAnimation() {
    return html`
      <app-spinner></app-spinner>
    `;
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
              dispatch(this, 'modal-close');
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

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 500px;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        --search-field-height: 50px;
        --table-header-height: 45px;
      }
      :host([collapsed]) {
        height: var(--search-field-height);
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
        overflow: hidden;
      }
      :host([collapsed]) .search-field {
        border-radius: 15px;
      }
      :host([collapsed]) .results {
        display: none;
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
        opacity: 0.2;
      }
      :host([collapsed]) .table-heading {
        display: none;
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
    `;
  }

  render() {
    return html`
      <div class="search-field" @input=${this.search}>
        <mdi-icon icon=${mdiMagnify} size=${26} color="#BBB"></mdi-icon>
        <input
          type="search"
          placeholder="Search away!"
          @focus=${() => dispatch(this, 'show-search')}
        />
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
    `;
  }
}
