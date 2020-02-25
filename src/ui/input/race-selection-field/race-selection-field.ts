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
import { store } from '../../../redux/store';
import { connect } from 'pwa-helpers';
import { AppState } from '../../../redux/reducer';

@customElement('race-selection-field')
export class RaceSelectionField extends connect(store)(LitElement) {
  @property() selectedRace!: string;
  @property() selectedSubrace: string | null = null;

  static get styles() {
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
        cursor: pointer;
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

  stateChanged(state: AppState) {
    this.selectedRace = state.characterDraft.race;
    this.selectedSubrace = state.characterDraft.subrace;
  }

  changeSelection(event: string, id: string) {
    let race = this.selectedRace;
    let subrace = this.selectedSubrace;
    if (event === 'race') {
      race = id;
      subrace = this.db.getSubRaceIdFromIndex(race, 0);
      subrace = subrace === undefined ? null : subrace;
    } else if (event === 'subrace') {
      subrace = id;
    }
    // redux uses null to mean no subrace and undefined to mean
    // not yet specified...
    store.dispatch({
      type: 'UPDATE_DRAFT',
      fields: {
        race,
        subrace,
      },
    });
  }

  render() {
    const allRaces = this.db.getAllRaces();
    const allSubRaces = this.db.getAllSubRaces(this.selectedRace);

    return html`
      <div class="group">
        <label tabindex="0">Race</label>
        <div class="list">
          ${allRaces.map(([raceKey, race]) =>
            this.renderCard(
              raceKey,
              race.name,
              race.tagline,
              this.selectedRace === raceKey,
              'race'
            )
          )}
        </div>
      </div>
      <div class="group">
        <label tabindex="0">Subrace</label>
        <div class="list ${this.selectedSubrace ? '' : 'inactive'}">
          ${allSubRaces.map(([subRaceKey, subrace]) =>
            this.renderCard(
              subRaceKey,
              subrace.fullName,
              subrace.tagline,
              this.selectedSubrace === subRaceKey,
              'subrace'
            )
          )}
          ${this.selectedSubrace
            ? null
            : html`
                <p>You don't need to pick a subrace for this one!</p>
              `}
        </div>
      </div>
    `;
  }
}
