import '../../components/character-card/character-card';
import '../../components/text-field/text-field';
import '../../components/class-selector/class-selector';
import '../../components/race-selection-field/race-selection-field';
import '../../components/ability-score-input-field/ability-score-input-field';
import '../../components/basic-stats-input-field/basic-stats-input-field';
import '../../components/additional-stats-input-field/additional-stats-input-field';
import '../../components/saving-throw-input-field/saving-throw-input-field';
import '../../components/skills-input-field/skills-input-field';

import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { CharacterSheetDraft } from '../../redux/characterDraft';
import { AppState } from '../../redux/reducer';
import { allAbilities } from '../../data/CharacterSheet';

/**
 * A field is simply some input field that generates mutations,
 * the field registers this mutations by calling the provided mutate
 * function.
 */
interface Step {
  title: TemplateResult;
  valid: (draft: CharacterSheetDraft) => boolean;
  fields: TemplateResult;
}

// Validation logic.

function all(a: Array<boolean>) {
  return a.reduce((acc, v) => acc && v, true);
}
function isNum(v: string) {
  return !isNaN(parseInt(v));
}
function isPosNum(v: string, includeZero: boolean = false) {
  if (includeZero) return isNum(v) && parseInt(v) >= 0;
  return isNum(v) && parseInt(v) > 0;
}

function stepOneValid(d: CharacterSheetDraft) {
  return (
    d.name !== undefined &&
    d.name.replace(/\s/g, '') !== '' &&
    d.race !== undefined &&
    d.subrace !== undefined &&
    d.classes.length >= 1
  );
}

function stepTwoValid(d: CharacterSheetDraft) {
  const abilityScoreValid = all(
    allAbilities.map(a => isPosNum(d.abilityScores[a]))
  );
  const basicStatsValid = all([
    isPosNum(d.maxHealth),
    isPosNum(d.hitDice.number),
    isPosNum(d.hitDice.type),
    isPosNum(d.ac),
    isPosNum(d.initiative, true),
    isPosNum(d.speed),
  ]);
  const additionalStatsValid = all([
    isPosNum(d.inspiration, true),
    isPosNum(d.profBonus, true),
    isPosNum(d.passiveWisdom),
    isPosNum(d.xp, true),
  ]);
  const savingThrowsValid = all(
    allAbilities.map(a => isNum(d.savingThrows[a].value))
  );

  return (
    abilityScoreValid &&
    basicStatsValid &&
    additionalStatsValid &&
    savingThrowsValid
  );
}

const NEW_CHARACTER_FLOW: Step[] = [
  {
    title: html`
      Lets start with the <span>Basics<span></span> </span>
    `,
    valid: d => stepOneValid(d),
    fields: html`
      <text-field
        name="Character Name"
        reflect="characterDraft.name"
      ></text-field>
      <class-selector></class-selector>
      <race-selection-field></race-selection-field>
    `,
  },
  {
    title: html`
      Looking good, lets talk
      <span>Numbers</span>.
    `,
    valid: d => stepTwoValid(d),
    fields: html`
      <ability-score-input-field></ability-score-input-field>
      <basic-stats-input-field></basic-stats-input-field>
      <additional-stats-input-field></additional-stats-input-field>
      <saving-throw-input-field></saving-throw-input-field>
    `,
  },
  {
    title: html`
      But what are your <span>Skills</span>?
    `,
    valid: () => true,
    fields: html`
      <skills-input-field></skills-input-field>
    `,
  },
];

@customElement('new-character')
export class NewCharacter extends connect(store)(LitElement) {
  @property() draft!: CharacterSheetDraft;
  @property() currentStep: number = 3;

  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
        width: 100%;
        --page-width: 800px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      }
      .heading {
        margin-bottom: 32px;
        width: 100%;
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        padding-bottom: 1rem;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .heading .progress-bar {
        background: #ebebeb;
        height: 2px;
        width: 100%;
      }
      .heading .progress {
        width: 100%;
        height: 100%;
        transition: 0.5s all;
      }
      .form-fields {
        width: var(--page-width);
        padding: 0 32px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
      .navigation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 100px;
        width: 100%;
      }
      .chip {
        color: var(--theme-primary);
        border: 2px solid var(--theme-primary);
        border-radius: 15px;
        padding: 4px 12px;
        font-size: 0.8rem;
        margin: 0 4px;
        background: none;
        cursor: pointer;
      }
      .chip.disabled {
        opacity: 0.5;
        cursor: default;
      }
      .chip:hover {
        background: var(--theme-primary-light);
      }
      .chip.disabled:hover {
        background: none;
      }
      .chip.primary {
        background: var(--theme-primary);
        color: white;
      }
      .chip.primary:hover {
        opacity: 0.8;
      }
      .chip.primary.disabled:hover {
        background: var(--theme-primary);
        opacity: 0.5;
      }
    `;
  }

  stateChanged(state: AppState) {
    this.draft = state.characterDraft;
  }

  /**
   * The current progress the user is at in the new character flow
   * as a percentage out of 100.
   */
  progress() {
    return (this.currentStep / NEW_CHARACTER_FLOW.length) * 100;
  }

  getTitle() {
    return NEW_CHARACTER_FLOW[this.currentStep - 1].title;
  }

  getFields() {
    return NEW_CHARACTER_FLOW[this.currentStep - 1].fields;
  }

  prevStep() {
    if (this.currentStep < 2) {
      return;
    }
    this.currentStep--;
  }

  nextStep() {
    if (!this.nextAllowed()) {
      return;
    }
    this.currentStep++;
  }

  create() {}

  nextAllowed() {
    if (this.currentStep > NEW_CHARACTER_FLOW.length - 1) {
      return false;
    }

    return NEW_CHARACTER_FLOW[this.currentStep - 1].valid(this.draft);
  }

  render() {
    return html`
      <div class="heading">
        <h1>
          ${this.getTitle()}
        </h1>
        <div class="progress-bar">
          <div
            class="progress"
            style=${`width: ${this.progress()}%`}
          ></div>
        </div>
      </div>
      <div class="form-space">
        <div class="form-fields">
          ${this.getFields()}
          <div class="navigation">
            ${this.currentStep === 1
              ? null
              : html`
                  <button @click=${this.prevStep} class="chip">
                    Previous Step
                  </button>
                `}
            ${this.currentStep === NEW_CHARACTER_FLOW.length
              ? html`
                  <button
                    @click=${this.create}
                    class="chip primary ${this.nextAllowed()
                      ? ''
                      : 'disabled'}"
                  >
                    Create Character
                  </button>
                `
              : html`
                  <button
                    @click=${this.nextStep}
                    class="chip primary ${this.nextAllowed()
                      ? ''
                      : 'disabled'}"
                  >
                    Next Step
                  </button>
                `}
          </div>
        </div>
      </div>
    `;
  }
}
