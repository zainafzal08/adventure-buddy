import '../number-field/number-field';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import {
  allSkills,
  Ability,
  getSkillAbility,
  toModifier,
} from '../../data/CharacterSheet';
import { mdiAutoFix } from '@mdi/js';
import { SkillsDecleration } from '../../redux/characterDraft';

@customElement('skills-input-field')
export class SkillsInputField extends connect(store)(LitElement) {
  @property() private skills!: SkillsDecleration;
  @property() private abilities!: { [k in Ability]: string };
  @property() private profBonus!: string;

  stateChanged(state: AppState) {
    this.skills = state.characterDraft.skills;
    this.profBonus = state.characterDraft.profBonus;
    this.abilities = state.characterDraft.abilityScores;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .fields {
        width: 100%;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
      }
      .heading {
        width: 100%;
        height: 28px;
        margin-bottom: 8px;
        padding-left: 8px;
        display: flex;
        align-items: center;
      }
      h3 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        opacity: 0.9;
        font-weight: 500;
        padding-right: 8px;
      }
      .bar {
        width: 2px;
        background: #ebebeb;
        height: 100%;
        margin: 0 8px;
      }
      number-proficient-field {
        margin: 0 8px;
        width: calc(100% - 16px);
      }
    `;
  }

  syncInput() {
    store.dispatch({
      type: 'UPDATE_DRAFT',
      fields: {
        skills: this.skills,
      },
    });
  }

  generateValues() {
    const result: Partial<SkillsDecleration> = {};
    for (const s of allSkills) {
      const profBonus =
        this.skills[s].proficient && !isNaN(parseInt(this.profBonus))
          ? parseInt(this.profBonus)
          : 0;
      const ability = !isNaN(
        parseInt(this.abilities[getSkillAbility(s)])
      )
        ? parseInt(this.abilities[getSkillAbility(s)])
        : 0;
      result[s] = {
        value: (toModifier(ability) + profBonus).toString(),
        proficient: this.skills[s].proficient,
      };
    }
    return result as SkillsDecleration;
  }

  autofill() {
    if (this.autofillImpossible()) return;
    this.skills = this.generateValues();
    this.syncInput();
  }

  autofillImpossible() {
    const generated = this.generateValues();
    return allSkills
      .map(s => this.skills[s].value === generated[s].value)
      .reduce((acc, v) => acc && v);
  }

  render() {
    return html`
      <div class="heading">
        <h3>Skills</h3>
        <div class="bar"></div>
        <icon-btn
          icon=${mdiAutoFix}
          size="small"
          disabled=${this.autofillImpossible()}
          @click=${() => this.autofill()}
          >Autofill</icon-btn
        >
      </div>
      <div class="fields">
        ${allSkills.map(
          skill =>
            html`
              <number-proficient-field
                name=${skill}
                reflect=${`characterDraft.skills.${skill}`}
              ></number-proficient-field>
            `
        )}
      </div>
    `;
  }
}
