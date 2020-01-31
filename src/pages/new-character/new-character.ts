import '../../components/character-card/character-card';
import '../../components/text-field/text-field';
import '../../components/class-selector/class-selector';
import '../../components/race-selection-field/race-selection-field';
import '../../components/ability-score-input-field/ability-score-input-field';
import '../../components/basic-stats-input-field/basic-stats-input-field';
import '../../components/additional-stats-input-field/additional-stats-input-field';
import '../../components/saving-throw-input-field/saving-throw-input-field';
import '../../components/skills-input-field/skills-input-field';

import hex from '../../assets/hex.svg';

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
import {
  mdiSword,
  mdiDice5,
  mdiPlusOne,
  mdiAccount,
  mdiBookOpenPageVariant,
  mdiAutoFix,
} from '@mdi/js';

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
      How about your <span>Skills</span>?
    `,
    valid: () => true,
    fields: html`
      <skills-input-field></skills-input-field>
    `,
  },
  {
    title: html`
      Show me how you deal <span>Damage</span>!
    `,
    valid: () => true,
    fields: html`
      <attacks-input-field></attacks-input-field>
    `,
  },
  {
    title: html`
      Do you weave the <span>Arcane</span>?
    `,
    valid: () => true,
    fields: html`
      <arcane-input-field></arcane-input-field>
    `,
  },
  {
    title: html`
      Lastly, tell me your <span>Story</span>?
    `,
    valid: () => true,
    fields: html`
      <misc-input-field></misc-input-field>
    `,
  },
];

@customElement('new-character')
export class NewCharacter extends connect(store)(LitElement) {
  @property() draft!: CharacterSheetDraft;
  @property({ attribute: true, reflect: true }) currentStep: number = 1;

  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
        width: 100%;
        height: 100%;
        --page-width: 800px;
        --section-heading-height: 64px;
        display: grid;
        grid-template-rows: var(--section-heading-height) auto;
        grid-template-columns: var(--page-width) auto;
        grid-template-areas:
          'header header'
          'form progress';
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        border-bottom: 2px solid #ebebeb;
        width: 100%;
        padding-bottom: 1rem;
        height: fit-content;
        grid-area: header;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .form-fields {
        width: 100%;
        grid-area: form;
        box-sizing: border-box;
        padding: 24px 32px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
      .navigation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 60px;
        width: 100%;
      }
      .progress {
        grid-area: progress;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progress .bounding {
        width: 300px;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progress svg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
      }
      .progress .step {
        width: 32px;
        height: 32px;
        background: #efefef;
        border-radius: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }
      .progress .step.done {
        background: var(--theme-primary);
      }
      .progress .step.active {
        background: var(--theme-primary);
      }
      .step.top {
        top: -13px;
        left: 135px;
      }
      .step.bottom {
        bottom: -13px;
        left: 135px;
      }
      .step.top-right {
        right: 6px;
        top: 69px;
      }
      .step.top-left {
        left: 6px;
        top: 69px;
      }
      .step.bottom-right {
        right: 6px;
        bottom: 62px;
      }
      .step.bottom-left {
        left: 6px;
        bottom: 62px;
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

  renderProgressPoint(icon: string, step: number, position: string) {
    return html`
      <div
        class="step ${position} ${this.currentStep > step
          ? 'done'
          : ''} ${this.currentStep === step ? 'active' : ''}"
      >
        <mdi-icon
          color=${this.currentStep >= step ? '#fff' : '#bbb'}
          icon=${icon}
        ></mdi-icon>
      </div>
    `;
  }

  getStepColor(step: number) {
    if (step < this.currentStep) return 'var(--theme-primary)';
    if (this.currentStep === 6 && step === 6) {
      return 'var(--theme-primary)';
    }
    return '#efefef';
  }

  render() {
    return html`
      <h1>${this.getTitle()}</h1>
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
      <div class="progress">
        <div class="bounding">
          ${this.renderProgressPoint(mdiAccount, 1, 'top')}
          ${this.renderProgressPoint(mdiDice5, 2, 'top-right')}
          ${this.renderProgressPoint(mdiPlusOne, 3, 'bottom-right')}
          ${this.renderProgressPoint(mdiSword, 4, 'bottom')}
          ${this.renderProgressPoint(mdiAutoFix, 5, 'bottom-left')}
          ${this.renderProgressPoint(
            mdiBookOpenPageVariant,
            6,
            'top-left'
          )}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke=${this.getStepColor(1)}
              d="M40.4012 0L74.8022 21.9469V60.177"
            />
            <path
              stroke=${this.getStepColor(2)}
              d="M74.8022 21.9469V60.177"
            />
            <path
              stroke=${this.getStepColor(3)}
              d="M74.8022 60.177L40.4012 80"
            />
            <path
              stroke=${this.getStepColor(4)}
              d="M40.4012 80L6 60.177"
            />
            <path
              stroke=${this.getStepColor(5)}
              d="M6 60.177V21.9469"
            />
            <path
              stroke=${this.getStepColor(6)}
              d="M6 21.9469L40.4012 0"
            />
          </svg>
        </div>
      </div>
    `;
  }
}
