import '../number-proficient-field/number-proficient-field';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';
import {
  Ability,
  toModifier,
  abilityShorthand,
} from '../../../data/CharacterSheet';
import { AppState } from '../../../redux/reducer';
import { mdiAutoFix } from '@mdi/js';

type DraftSavingThrows = {
  [k in Ability]: { value: string; proficient: boolean };
};

@customElement('saving-throw-input-field')
export class SavingThrowInputField extends connect(store)(LitElement) {
  private abilities = [
    Ability.STR,
    Ability.DEX,
    Ability.CON,
    Ability.INT,
    Ability.WIS,
    Ability.CHR,
  ];

  @property() private savingThrowScores!: DraftSavingThrows;
  @property() private abilityScores!: { [k in Ability]: string };
  @property() private proficiencyBonus!: string;

  stateChanged(state: AppState) {
    this.savingThrowScores = state.characterDraft.savingThrows;
    this.abilityScores = state.characterDraft.abilityScores;
    this.proficiencyBonus = state.characterDraft.profBonus;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: fit-content;
      }
      .fields {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
      }
      .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 0 8px;
      }
      input {
        width: 100%;
        background: none;
        outline: none;
        border: none;
        border-bottom: 2px solid #ebebeb;
        text-align: center;
        font-size: 1.2rem;
        color: #444;
        padding-bottom: 4px;
        font-family: var(--font-stack);
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
    `;
  }

  setSavingThrow(ability: Ability, value: number) {
    this.savingThrowScores = {
      ...this.savingThrowScores,
      [ability]: {
        proficient: this.savingThrowScores[ability].proficient,
        value,
      },
    };
    this.syncInput();
  }

  setProficient(ability: Ability, proficient: boolean) {
    this.savingThrowScores = {
      ...this.savingThrowScores,
      [ability]: {
        proficient,
        value: this.savingThrowScores[ability].value,
      },
    };
    this.syncInput();
  }

  syncInput() {
    store.dispatch({
      type: 'UPDATE_DRAFT',
      fields: {
        savingThrows: this.savingThrowScores,
      },
    });
  }

  generateValues() {
    const generated: Record<
      string,
      { proficient: boolean; value: string }
    > = {};
    for (const ability of this.abilities) {
      let val = parseInt(this.abilityScores[ability]);
      let profBonus = parseInt(this.proficiencyBonus);
      if (isNaN(val)) val = 10;
      if (isNaN(profBonus)) profBonus = 0;
      const isProf = this.savingThrowScores[ability].proficient;
      if (!isProf) {
        profBonus = 0;
      }

      generated[ability] = {
        proficient: isProf,
        value: (toModifier(val) + profBonus).toString()!,
      };
    }
    return generated;
  }

  autofill() {
    if (this.autofillImpossible()) return;
    this.savingThrowScores = this.generateValues() as DraftSavingThrows;
    this.syncInput();
  }

  autofillImpossible() {
    const generated = this.generateValues();
    return this.abilities
      .map(a => this.savingThrowScores[a].value === generated[a].value)
      .reduce((acc, v) => acc && v);
  }

  render() {
    return html`
      <div class="heading">
        <h3>Saving Throws</h3>
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
        ${this.abilities.map(
          ability => html`
            <div class="container">
              <number-proficient-field
                name=${abilityShorthand[ability]}
                reflect=${`characterDraft.savingThrows.${ability}`}
              ></number-proficient-field>
            </div>
          `
        )}
      </div>
    `;
  }
}
