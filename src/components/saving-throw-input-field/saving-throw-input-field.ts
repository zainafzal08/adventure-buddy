import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import {
  SavingThrows,
  BaseStats,
  Ability,
  toModifier,
} from '../../data/CharacterSheet';
import { AppState } from '../../redux/reducer';

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

  private savingThrowScores?: SavingThrows;
  private abilityScores?: BaseStats;

  stateChanged(state: AppState) {
    this.savingThrowScores = state.characterDraft.savingThrows;
    this.abilityScores = state.characterDraft.abilityScores;
  }

  static get styles() {
    return css`
      :host {
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
    `;
  }

  setSavingThrow(ability: Ability, value: number) {
    this.savingThrowScores![ability].value = value;
    this.syncInput();
  }

  setProficient(ability: Ability, value: boolean) {
    this.savingThrowScores![ability].proficient = value;
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

  render() {
    return html`
      ${this.abilities.map(
        ability => html`
          <div class="container">
            <label>${ability}</label>
            ${this.getSavingThrow(ability)}
          </div>
        `
      )}
    `;
  }
}
