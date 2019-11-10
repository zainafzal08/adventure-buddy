import { LitElement, html, customElement, css, TemplateResult, query, property } from 'lit-element';
import { Database, Topic, Table } from '../database';
import icons from '../assets/icons/*.svg';

interface Tag {
  pattern: RegExp
}

const DEFAULT_HELP_MSG = html`
  <p>
    Search for anything! You can use hashtags like
    <span> #spell #item #effect </span>
    to help narrow the results.
  </p>
`

@customElement('dm-handbook')
export class DmHandbook extends LitElement {
  @query('input') searchInput!:HTMLInputElement; 
  
  @property() searchHelp = DEFAULT_HELP_MSG;

  private database = new Database();

  private tags: Map<Topic, Tag> = new Map([
    ['spells', { pattern: /(#spells?)|(#magic)/g }],
    ['equipment', { pattern: /(#equip(ment)?)|(#items?)/g }],
    ['combat', { pattern: /(#combat)|(#fight(ing)?)/g }],
    ['magic', { pattern: /(#magic)|(#fight(ing)?)/g }],
    ['features', { pattern: /(#feature?)|(#abilitys?)|(#skills?)/g }],
    ['movement', { pattern: /#mov(e|(ing)|(ement))/g }],
    ['resting', { pattern: /#rest(ing)?/g }],
    ['enviornment', { pattern: /#(world)|(enviorn(ment)?)/g }],
    ['death', { pattern: /#death/g }],
    ['effects', { pattern: /#(effects?)|(conditions?)/g }]
  ]);

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
        background: #fafafa;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      }
      h1 {
        width: 100%;
        margin: 0;
        text-align: center;
        color: #444;
        font-weight: 100;
        font-family: 'Montserrat', sans-serif;
      }
      p {
        width: 100%;
        margin: 0;
        margin-top: 1rem;
        text-align: center;
        color: #777;
        font-weight: 100;
        font-family: 'Montserrat', sans-serif;
      }
      .search {
        margin-top: 2rem;
        width: calc(700px - 1.5rem);
        padding: 0 1rem 0 0.5rem;
        height: 2rem;
        background: #ebebeb;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .search img {
        opacity: 0.5;
      }
      .search input {
        flex-grow: 1;
        padding: 0 0.5rem;
        font-size: 1.3rem;
        background: none;
        border: none;
        color: #555;
      }
      .search input:focus {
        outline: none;
      }
      .results {
        margin-top: 4rem;
        width: 1000px;
        display: flex;
        justify-content: center;
      }
      .no-results{
        width: 60%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #bbb;
        font-family: 'Montserrat', sans-serif;
      }
      .help > p {
        font-size: .8rem;
        color: #BBB;
      }
      .help > p > span {
        color: var(--theme-primary);
      }
    `;
  }

  firstUpdated() {
    this.searchInput!.addEventListener('input', () => {
      this.updateSearch(this.searchInput!.value);
    });
  }

  private updateSearch(searchText: string) {
    if (searchText === '') {
      this.searchHelp = DEFAULT_HELP_MSG;
      return;
    }

    const tables = [];
    for (const tag of this.tags) {
      if (tag[1].pattern.exec(searchText)) {
        searchText = searchText.replace(tag[1].pattern, '');
        tables.push(tag[0]);
      }
    }
    let topics = 'all topics'
    if (tables.length === 1) {
      topics = `the ${tables[0]} topic`;
    } else if (tables.length > 1) {
      const last = tables.pop();
      const list = tables.join(', ');
      topics = `the ${list} and ${last} topics`;
    }
    
    searchText = searchText.replace(/(^\s+)|(\s+$)/,'');
    this.searchHelp = html`
      <p>
        Searching for '${searchText}' over <span>${topics}<span>
      </p>
    `
  }

  private renderTable(result: Table) {
    return html``;
  }

  render() {
    return html`
      <div class='page'>
        <section-title
          title='Dungeon Master Handbook'
          subtitle='A quick way to search up rules,
        spells and equipment'
          icon=${icons['book']}
        ></section-title>
        <div class='search'>
          <img src="${icons['search']}" />
          <input />
        </div>
        <div class='help'>
          ${this.searchHelp}
        </div>
        <div class='results'>
          
        </div>
      </div>
    `;
  }
}










