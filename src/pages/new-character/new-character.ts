import '../../ui/input/text-field/text-field';
import '../../ui/input/class-selector-input/class-selector-input';
import '../../ui/input/race-selection-field/race-selection-field';
import '../../ui/input/ability-score-input-field/ability-score-input-field';
import '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import '../../ui/input/skills-input-field/skills-input-field';

import {
  LitElement,
  html,
  customElement,
  css,
  query,
  property,
} from 'lit-element';
import { mdiAutoFix, mdiChevronRight, mdiDelete } from '@mdi/js';
import { SavingThrowInputField } from '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import { TextField } from '../../ui/input/text-field/text-field';
import { ClassSelectorInput } from '../../ui/input/class-selector-input/class-selector-input';
import { RaceSelectionField } from '../../ui/input/race-selection-field/race-selection-field';
import { AbilityScoreInputField } from '../../ui/input/ability-score-input-field/ability-score-input-field';
import { BasicStatsInputField } from '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import { AdditionalStatsInputField } from '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import { SkillsInputField } from '../../ui/input/skills-input-field/skills-input-field';

@customElement('new-character')
export class NewCharacter extends LitElement {
  @query('#new-character-name') characterNameInput!: TextField;
  @query('#new-character-alignment')
  characterAlignmentInput!: TextField;
  @query('#new-character-background')
  characterBackgroundInput!: TextField;
  @query('class-selector-input')
  characterClassInput!: ClassSelectorInput;
  @query('race-selection-field')
  characterRaceInput!: RaceSelectionField;
  @query('ability-score-input-field')
  abilityScoreInput!: AbilityScoreInputField;
  @query('saving-throw-input-field')
  characterSavingThrowInput!: SavingThrowInputField;
  @query('basic-stats-input-field')
  characterBasicStatsInput!: BasicStatsInputField;
  @query('additional-stats-input-field')
  characterAdditionalStatsInput!: AdditionalStatsInputField;
  @query('skills-input-field')
  characterSkillsInput!: SkillsInputField;

  @property() savingThrowAutofillDisabled: boolean = true;
  @property() skillsAutofillDisabled: boolean = true;

  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        --page-width: 800px;
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        border-bottom: 2px solid #ebebeb;
        width: 100%;
        padding-bottom: 1rem;
        height: fit-content;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .form-fields {
        width: var(--page-width);
        margin-top: 24px;
      }
      h2 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        font-weight: 500;
        margin-top: 48px;
        margin-bottom: 24px;
        font-weight: 100;
      }
      .form-fields > h2:first-child {
        margin-top: 24px;
      }
      .heading {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 48px;
        margin-bottom: 24px;
      }
      .heading h2 {
        margin: 0;
      }
      .v-bar {
        margin: 0 16px 0 20px;
        width: 3px;
        height: 1.8rem;
        background: #ebebeb;
      }
      .split {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .split * {
        width: calc(50% - 12px);
      }
      .footer {
        width: var(--page-width);
        height: 64px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .fabs {
        position: fixed;
        right: 48px;
        bottom: 32px;
      }
    `;
  }

  clear() {
    this.characterNameInput.clear();
    this.characterAlignmentInput.clear();
    this.characterBackgroundInput.clear();
    this.characterClassInput.clear();
    this.characterRaceInput.clear();
    this.abilityScoreInput.clear();
    this.characterSavingThrowInput.clear();
    this.characterBasicStatsInput.clear();
    this.characterAdditionalStatsInput.clear();
    this.characterSkillsInput.clear();
  }

  savingThrowAutofill() {
    const abilityScores = this.abilityScoreInput.value;
    const profBonus = this.characterAdditionalStatsInput.value
      .proficiencyBonus;
    this.characterSavingThrowInput.autofill(abilityScores, profBonus);
  }

  skillsAutofill() {
    const abilityScores = this.abilityScoreInput.value;
    const profBonus = this.characterAdditionalStatsInput.value
      .proficiencyBonus;
    this.characterSkillsInput.autofill(abilityScores, profBonus);
  }

  firstUpdated() {
    this.valueUpdated();
  }

  valueUpdated() {
    // Update autofill status.
    const abilityScores = this.abilityScoreInput.value;
    const profBonus = this.characterAdditionalStatsInput.value
      .proficiencyBonus;

    this.savingThrowAutofillDisabled = this.characterSavingThrowInput.autofillImpossible(
      abilityScores,
      profBonus
    );

    this.skillsAutofillDisabled = this.characterSkillsInput.autofillImpossible(
      abilityScores,
      profBonus
    );
  }

  createCharacter() {}

  render() {
    return html`
      <h1>Tell me a bit about <span>Yourself</span></h1>
      <div class="form-fields" @value-updated=${this.valueUpdated}>
        <h2>Basics</h2>
        <text-field
          id="new-character-name"
          name="Character Name"
          placeholder="Enter Name Here!"
        ></text-field>
        <div class="split">
          <text-field
            id="new-character-background"
            name="Background"
            placeholder="Acolyte"
          ></text-field>
          <text-field
            id="new-character-alignment"
            name="Alignment"
            placeholder="Chaotic Good"
          ></text-field>
        </div>
        <class-selector-input
          id="new-character-classes"
        ></class-selector-input>
        <race-selection-field
          id="new-character-race"
        ></race-selection-field>
        <h2>Ability Scores</h2>
        <ability-score-input-field></ability-score-input-field>
        <div class="heading">
          <h2>Saving Throws</h2>
          <div class="v-bar"></div>
          <icon-btn
            icon=${mdiAutoFix}
            size="small"
            disabled=${this.savingThrowAutofillDisabled}
            @click=${() => {
              this.savingThrowAutofill();
            }}
            >Autofill</icon-btn
          >
        </div>
        <saving-throw-input-field></saving-throw-input-field>
        <h2>Core Details</h2>
        <basic-stats-input-field></basic-stats-input-field>
        <additional-stats-input-field></additional-stats-input-field>
        <div class="heading">
          <h2>Skills</h2>
          <div class="v-bar"></div>
          <icon-btn
            icon=${mdiAutoFix}
            size="small"
            disabled=${this.skillsAutofillDisabled}
            @click=${() => {
              this.skillsAutofill();
            }}
            >Autofill</icon-btn
          >
        </div>
        <skills-input-field></skills-input-field>
      </div>
      <div class="footer">
        <icon-btn
          icon=${mdiDelete}
          size="large"
          @click=${() => {
            this.clear();
          }}
          >Clear</icon-btn
        >
        <icon-btn
          icon=${mdiChevronRight}
          size="large"
          primary="true"
          @click=${() => {
            this.createCharacter();
          }}
          >Create Character</icon-btn
        >
      </div>
    `;
  }
}
