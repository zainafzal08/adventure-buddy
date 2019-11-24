import '../ui/section-title/section-title';
import '../ui/quick-stats/quick-stats';
import '../ui/stat-list/stat-list';
import '../error-page/error-page';

import { html, customElement, css, property } from 'lit-element';

import {
  CharacterSheetData,
  getDatabase,
  getAbilityDisplayName,
  Ability,
  Skill,
  getSkillAbility,
} from '../database';
import { AsyncElement } from '../AsyncElement';

@customElement('character-sheet')
export class CharacterSheet extends AsyncElement {
  @property() sheet!: CharacterSheetData;
  @property() id!: string;

  static get styles() {
    return css`
      .row {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
      }
      .row stat-list:nth-child(1) {
        width: 20%;
      }
      .row stat-list:nth-child(2) {
        width: calc(60% - 96px);
      }
      .row stat-list:nth-child(3) {
        width: 20%;
      }
      @media all and (max-width: 900px) {
        .row {
          flex-direction: column;
        }
        .row stat-list:nth-child(1) {
          width: 100%;
        }
        .row stat-list:nth-child(2) {
          width: 100%;
        }
        .row stat-list:nth-child(3) {
          width: 100%;
        }
      }
    `;
  }

  async init() {
    const database = getDatabase();
    const sheet = await database.getCharacterSheet(this.id);
    if (!sheet) {
      this.ready = true;
      this.fail('No character by that ID exists!');
      return;
    }
    this.sheet = sheet;
  }

  loading() {
    return html`
      <p>Loading...</p>
    `;
  }

  error(context: string) {
    return html`
      <p>uh oh: ${context}</p>
    `;
  }

  baseStats() {
    const base: Ability[] = ['str', 'dex', 'con', 'int', 'wis', 'chr'];
    return base.map(ability => {
      return {
        title: getAbilityDisplayName(ability),
        subtitle: this.sheet.ability[ability],
        value: this.sheet.getModifier(ability),
      };
    });
  }

  skills() {
    return Object.values(Skill).map(skill => ({
      title: skill.toLowerCase(),
      subtitle: getSkillAbility(skill as Skill),
      value: this.sheet.getSkillModifier(skill as Skill),
      proficient: this.sheet.proficiencies.has(skill as Skill),
    }));
  }

  saving() {
    const base: Ability[] = ['str', 'dex', 'con', 'int', 'wis', 'chr'];
    return base.map(ability => ({
      title: getAbilityDisplayName(ability),
      subtitle: this.sheet.ability[ability],
      value: 2,
      proficient: this.sheet.proficiencies.has(ability),
    }));
  }

  template() {
    return html`
      <section-title
        title=${this.sheet.name}
        subtitle=${this.sheet.getDescriptor()}
        icon=${this.sheet.getIcon()}
      ></section-title>
      <quick-stats .sheet=${this.sheet}></quick-stats>
      <div class="row">
        <stat-list title="Stats" .items=${this.baseStats()}></stat-list>
        <stat-list
          title="Skills"
          .items=${this.skills()}
          cols=${2}
        ></stat-list>
        <stat-list
          title="Saving Throws"
          .items=${this.saving()}
        ></stat-list>
      </div>
    `;
  }
}
