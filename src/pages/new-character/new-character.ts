import '../../ui/input/text-field/text-field';
import '../../ui/input/class-selector-input/class-selector-input';
import '../../ui/input/race-selection-field/race-selection-field';
import '../../ui/input/ability-score-input-field/ability-score-input-field';
import '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import '../../ui/input/skills-input-field/skills-input-field';
import '../../ui/input/spellcasting-input-field/spellcasting-input-field';

import {
  LitElement,
  html,
  customElement,
  css,
  query,
  property,
} from 'lit-element';
import {
  mdiAutoFix,
  mdiChevronRight,
  mdiDelete,
  mdiCheck,
  mdiCancel,
} from '@mdi/js';
import { SavingThrowInputField } from '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import { TextField } from '../../ui/input/text-field/text-field';
import { ClassSelectorInput } from '../../ui/input/class-selector-input/class-selector-input';
import { RaceSelectionField } from '../../ui/input/race-selection-field/race-selection-field';
import { AbilityScoreInputField } from '../../ui/input/ability-score-input-field/ability-score-input-field';
import { BasicStatsInputField } from '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import { AdditionalStatsInputField } from '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import { SkillsInputField } from '../../ui/input/skills-input-field/skills-input-field';
import { SpellcastingInputField } from '../../ui/input/spellcasting-input-field/spellcasting-input-field';
import climbingHuman from '../../assets/humaaans/climbing.svg';

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
  @query('spellcasting-input-field')
  characterSpellcastingInput!: SpellcastingInputField;

  @property() savingThrowAutofillDisabled: boolean = true;
  @property() skillsAutofillDisabled: boolean = true;
  @property() spellcastingAutofillDisabled: boolean = false;
  @property() characterValid: boolean = false;
  @property() spellcastingDisabled: boolean = false;

  private id: string = 'new-character';

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
      .backdrop {
        width: 100%;
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .backdrop img {
        height: 200px;
        opacity: 0.7;
      }
      .backdrop p {
        margin: 0;
        margin-top: 32px;
        padding: 0;
        width: 400px;
        color: #bbb;
        text-align: center;
        font-size: 0.8rem;
      }
    `;
  }

  toggleSpellcasting() {
    this.spellcastingDisabled = !this.spellcastingDisabled;
    this.backup();
  }

  firstUpdated() {
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    if (saved) {
      this.spellcastingDisabled = JSON.parse(
        saved
      ).spellcastingDisabled;
    }
    this.valueUpdated();
  }

  backup() {
    localStorage.setItem(
      `saved-input-value(${this.id})`,
      JSON.stringify({
        spellcastingDisabled: this.spellcastingDisabled,
      })
    );
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
    this.characterSpellcastingInput.clear();
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

  spellcastingAutofill() {}

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

    this.spellcastingAutofillDisabled = this.characterSpellcastingInput.autofillImpossible();

    // Update validity status
    this.characterValid =
      this.characterNameInput.isValid() &&
      this.characterAlignmentInput.isValid() &&
      this.characterBackgroundInput.isValid() &&
      this.characterClassInput.isValid() &&
      this.characterRaceInput.isValid() &&
      this.abilityScoreInput.isValid() &&
      this.characterSavingThrowInput.isValid() &&
      this.characterBasicStatsInput.isValid() &&
      this.characterAdditionalStatsInput.isValid() &&
      this.characterSkillsInput.isValid() &&
      this.characterSpellcastingInput.isValid();
  }

  createCharacter() {}

  renderSpellcastingInput() {
    if (this.spellcastingDisabled) {
      return html`
        <div class="backdrop">
          <img src=${climbingHuman} />
          <p>
            Click on the “i am a spellcaster” button above if your
            character can do magic or else enjoy having one less step
          </p>
        </div>
      `;
    }
    return html`
      <spellcasting-input-field></spellcasting-input-field>
    `;
  }

  render() {
    return html`
      <h1>Tell me a bit about <span>Yourself</span></h1>
      <div class="form-fields" @value-updated=${this.valueUpdated}>
        <h2>Basics</h2>
        <text-field
          id="new-character-name"
          name="Character Name"
          placeholder="Enter Name Here!"
          initial="John Smith"
        ></text-field>
        <div class="split">
          <text-field
            id="new-character-background"
            name="Background"
            placeholder="Acolyte"
            ?canBeEmpty=${true}
          ></text-field>
          <text-field
            id="new-character-alignment"
            name="Alignment"
            placeholder="Chaotic Good"
            ?canBeEmpty=${true}
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
            ?disabled=${this.savingThrowAutofillDisabled}
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
            ?disabled=${this.skillsAutofillDisabled}
            @click=${() => {
              this.skillsAutofill();
            }}
            >Autofill</icon-btn
          >
        </div>
        <skills-input-field></skills-input-field>
        <div class="heading">
          <h2>Spellcasting</h2>
          <div class="v-bar"></div>
          <icon-btn
            icon=${this.spellcastingDisabled ? mdiCheck : mdiCancel}
            size="small"
            @click=${() => {
              this.toggleSpellcasting();
            }}
            >${
              this.spellcastingDisabled
                ? 'I am a spellcaster'
                : 'I am not a spellcaster'
            }</icon-btn>
          <icon-btn
            icon=${mdiAutoFix}
            size="small"
            ?disabled=${this.spellcastingAutofillDisabled ||
              this.spellcastingDisabled}
            @click=${() => {
              this.spellcastingAutofill();
            }}
            >Autofill</icon-btn>
        </div>
        ${this.renderSpellcastingInput()}
      </div>
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
          ?disabled=${!this.characterValid}
          @click=${() => {
            this.createCharacter();
          }}
          >Create Character</icon-btn
        >
      </div>
    `;
  }
}
