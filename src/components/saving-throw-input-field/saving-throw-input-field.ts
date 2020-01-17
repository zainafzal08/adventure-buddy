import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import {
  SavingThrows,
  BaseStats,
  Ability,
  toModifier,
  abilityShorthand,
} from '../../data/CharacterSheet';
import { AppState } from '../../redux/reducer';
import { mdiAutoFix } from '@mdi/js';

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

  private savingThrowScores!: SavingThrows;
  private abilityScores!: BaseStats;

  stateChanged(state: AppState) {
    this.savingThrowScores = state.characterDraft.savingThrows;
    this.abilityScores = state.characterDraft.abilityScores;
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

  getSavingThrow(ability: Ability) {
    const v = this.savingThrowScores![ability].value;
    if (v === -1) return toModifier(this.abilityScores![ability]);
    return v;
  }

  autofill() {}

  autofillImpossible() {
    return 'false';
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
              <number-field
                name=${abilityShorthand[ability]}
                .range=${[0]}
                reflect=${`characterDraft.savingThrows.${ability}.value`}
              ></number-field>
            </div>
          `
        )}
      </div>
    `;
  }
}
