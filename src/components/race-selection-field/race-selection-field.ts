import '../../components/mdi-icon/mdi-icon';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import * as RACES_STRICT from '../../assets/races.json';
import {
  mdiAccountMultiple,
  mdiImageFilterHdr,
  mdiLeaf,
  mdiHumanMale,
  mdiHumanChild,
  mdiFire,
  mdiHumanHandsup,
} from '@mdi/js';

interface Feature {
  fullName: string;
  desc: string;
  icon: string;
  link?: boolean;
}

interface SubRace {
  fullName: string;
  features: Feature[];
}

interface Race {
  name: string;
  tagline: string;
  physical: {
    height: string;
    size: string;
    speed: string;
  };
  subraces: { [x in string]: SubRace };
  features: Feature[];
}

// Importing a json object directly imposes some strict types we don't
// want to deal with, cast it to a more loose type since we trust our
// own keys, typescript just can't enforce their types.
const RACES: { [x in string]: Race } = RACES_STRICT;
delete RACES['default'];
const RACE_LIST = Object.keys(RACES);
@customElement('race-selection-field')
export class RaceSelectionField extends LitElement {
  @property() raceIndex: number = 0;

  private height: number = 0;

  firstUpdated() {
    this.addEventListener('keydown', keyEvent =>
      this.keydown(keyEvent)
    );
    this.height = this.shadowRoot!.querySelector(
      '.list'
    )!.getBoundingClientRect().height;
  }

  get selectedRace() {
    return RACES[RACE_LIST[this.raceIndex]];
  }

  static get styles() {
    // TODO(zafzal): make this less hardcoded.
    return css`
      :host {
        width: 100%;
        height: 400px;
        display: flex;
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
        flex-wrap: wrap;
        margin-top: 16px;
        background: white;
        border-radius: 15px;
        border: 1px solid #ebebeb;
      }

      .card {
        width: 100%;
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

  keydown(keyEvent: KeyboardEvent) {
    switch (keyEvent.key) {
      case 'ArrowUp':
        this.prevRace();
        break;
      case 'ArrowDown':
        this.nextRace();
        break;
    }
  }

  prevRace() {
    if (this.raceIndex <= 0) return;
    this.raceIndex--;
    this.updateChoice(RACE_LIST[this.raceIndex]);
  }

  nextRace() {
    if (this.raceIndex >= RACE_LIST.length - 1) return;
    this.raceIndex++;
    this.updateChoice(RACE_LIST[this.raceIndex]);
  }

  updateRace(raceKey: string) {
    this.raceIndex = RACE_LIST.indexOf(raceKey);
    this.updateChoice(raceKey);
  }

  updateChoice(raceKey: string) {
    // TODO: replace this with a library that's more reliable.
    const container = this.shadowRoot!.querySelector('.list')!;
    const height = this.height - 100;
    if (this.raceIndex * 70 - container.scrollTop > height) {
      container.scrollTop += 70;
    }
    if (container.scrollTop > this.raceIndex * 70) {
      container.scrollTop -= 70;
    }

    new CustomEvent('mutation', {
      bubbles: true,
      composed: true,
      detail: [
        {
          field: 'race',
          value: raceKey,
        },
      ],
    });
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

  isSelected(raceKey: string) {
    return RACE_LIST[this.raceIndex] === raceKey;
  }

  render() {
    return html`
      <div class="group">
        <label tabindex="0">Race</label>
        <div class="list">
          ${Object.entries(RACES).map(
            ([key, race]) =>
              html`
                <div
                  class="card ${this.isSelected(key) ? 'active' : ''}"
                  id=${key}
                  @click=${() => this.updateRace(key)}
                >
                  <mdi-icon
                    color="var(--theme-primary)"
                    background=${this.isSelected(key)
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'var(--theme-primary-light)'}
                    size="20"
                    icon=${this.getIcon(key)}
                  ></mdi-icon>
                  <div class="text">
                    <h1>${race.name}</h1>
                    <p>${race.tagline}</p>
                  </div>
                </div>
              `
          )}
        </div>
      </div>
      <div class="group">
        <label tabindex="0">Subrace</label>
        <div class="list"></div>
      </div>
    `;
  }
}
