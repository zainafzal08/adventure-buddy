import '../../components/mdi-icon/mdi-icon';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import {
  mdiAccountMultiple,
  mdiImageFilterHdr,
  mdiLeaf,
  mdiHumanMale,
  mdiHumanChild,
  mdiFire,
  mdiHumanHandsup,
} from '@mdi/js';
import { getDatabase } from '../../data/Database';

@customElement('race-selection-field')
export class RaceSelectionField extends LitElement {
  @property() activeRace!: string;
  @property() activeSubRace: string | null = null;

  constructor() {
    super();
    const db = getDatabase();
    this.activeRace = db.getRaceIdFromIndex(0);
    this.activeSubRace = db.getSubRaceIdFromIndex(this.activeRace, 0);
  }

  firstUpdated() {
    this.dispatchState();
  }

  static get styles() {
    // TODO(zafzal): make this less hardcoded.
    return css`
      :host {
        width: 100%;
        height: 350px;
        display: flex;
        margin: 16px 0;
      }

      .group {
        width: calc(50% - 16px);
        margin: 0 8px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .list {
        width: 100%;
        flex-grow: 1;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        margin-top: 16px;
        background: white;
        border-radius: 15px;
        border: 1px solid #ebebeb;
      }
      .list.inactive {
        justify-content: center;
        align-items: center;
        overflow: none;
        opacity: 0.6;
      }
      .list > p {
        width: 100%;
        box-sizing: border-box;
        color: #bbb;
        text-align: center;
        font-size: 12px;
        padding: 0 16px;
      }
      .card {
        width: calc(100% - 8px);
        box-sizing: border-box;
        padding: 10px 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: white;
        margin: 4px 4px;
        border-radius: 12px;
      }
      .card.active {
        background: var(--theme-primary);
      }
      .card mdi-icon {
        float: left;
      }
      .card .text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 16px;
      }
      .card h1 {
        margin: 0;
        color: #444;
        font-weight: 500;
        font-size: 15px;
      }
      .card.active h1 {
        color: #ffffff;
      }
      .card p {
        margin: 0;
        padding: 0;
        margin-top: 0.3rem;
        font-size: 10px;
        color: #bbb;
      }
      .card.active p {
        color: rgba(255, 255, 255, 0.7);
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
      }
      label:focus {
        color: var(--theme-primary);
        outline: none;
      }
    `;
  }

  getIcon(raceKey: string) {
    switch (raceKey) {
      case 'dwarf':
        return mdiImageFilterHdr;
      case 'elf':
        return mdiLeaf;
      case 'halfling':
        return mdiHumanChild;
      case 'human':
        return mdiHumanMale;
      case 'dragonborn':
        return mdiFire;
      case 'gnome':
        return mdiHumanHandsup;
      case 'half-elf':
        return mdiLeaf;
      case 'half-orc':
        return mdiFire;
      case 'tiefling':
        return mdiFire;
      default:
        return mdiAccountMultiple;
    }
  }

  renderCard(
    id: string,
    title: string,
    subtitle: string,
    active: boolean,
    event: string
  ) {
    return html`
      <div
        class="card ${active ? 'active' : ''}"
        id=${id}
        @click=${() => this.changeSelection(event, id)}
      >
        <mdi-icon
          color="var(--theme-primary)"
          background=${active
            ? 'rgba(255, 255, 255, 0.8)'
            : 'var(--theme-primary-light)'}
          size="20"
          icon=${this.getIcon(id)}
        ></mdi-icon>
        <div class="text">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </div>
    `;
  }

  changeSelection(event: string, id: string) {
    const db = getDatabase();
    if (event === 'race') {
      this.activeRace = id;
      this.activeSubRace = db.getSubRaceIdFromIndex(this.activeRace, 0);
    }
    if (event === 'subrace') {
      this.activeSubRace = id;
    }
    this.dispatchState();
  }

  dispatchState() {
    this.dispatchEvent(
      new CustomEvent('mutation', {
        bubbles: true,
        composed: true,
        detail: [
          {
            field: 'race',
            value: this.activeRace,
          },
          {
            field: 'subrace',
            value: this.activeSubRace,
          },
        ],
      })
    );
  }

  render() {
    const allRaces = getDatabase().getAllRaces();
    const allSubRaces = getDatabase().getAllSubRaces(this.activeRace);

    return html`
      <div class="group">
        <label tabindex="0">Race</label>
        <div class="list">
          ${allRaces.map(([raceKey, race]) =>
            this.renderCard(
              raceKey,
              race.name,
              race.tagline,
              this.activeRace === raceKey,
              'race'
            )
          )}
        </div>
      </div>
      <div class="group">
        <label tabindex="0">Subrace</label>
        <div class="list ${this.activeSubRace ? '' : 'inactive'}">
          ${allSubRaces.map(([subRaceKey, subrace]) =>
            this.renderCard(
              subRaceKey,
              subrace.fullName,
              subrace.tagline,
              this.activeSubRace === subRaceKey,
              'subrace'
            )
          )}
          ${this.activeSubRace
            ? null
            : html`
                <p>You don't need to pick a subrace for this one!</p>
              `}
        </div>
      </div>
    `;
  }
}
