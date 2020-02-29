import '../number-proficient-field/number-proficient-field';

import { LitElement, html, customElement, css } from 'lit-element';
import {
  allAbilities,
  abilityShorthand,
  Ability,
  getModifier,
} from '../../../data/ability';
import {
  SavingThrowsDecleration,
  AbilityScoresDecleration,
  ModifiableValue,
} from '../../../data/CharacterSheet';
import { NumberProficientField } from '../number-proficient-field/number-proficient-field';

@customElement('saving-throw-input-field')
export class SavingThrowInputField extends LitElement {
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
        width: calc(100% / 6 - 12px);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-sizing: border-box;
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

  get values(): SavingThrowsDecleration {
    const savingThrows: Partial<SavingThrowsDecleration> = {};
    for (const ability of allAbilities) {
      savingThrows[ability] = this.getValueForAbility(ability);
    }
    return savingThrows as SavingThrowsDecleration;
  }

  set values(savingThrows: SavingThrowsDecleration) {
    for (const ability of allAbilities) {
      this.setValueForAbility(ability, savingThrows[ability]);
    }
  }

  clear() {
    for (const a of allAbilities) {
      const input = this.shadowRoot?.getElementById(
        `new-character-saving-throw-${a}`
      ) as NumberProficientField;
      input.clear();
    }
  }

  autofill(
    abilityScores: AbilityScoresDecleration,
    proficiencyBonus: number
  ) {
    this.values = this.generateValues(abilityScores, proficiencyBonus);
  }

  autofillImpossible(
    abilityScores: AbilityScoresDecleration,
    proficiencyBonus: number
  ) {
    const generated = this.generateValues(
      abilityScores,
      proficiencyBonus
    );
    return allAbilities
      .map(a => this.values[a].value === generated[a].value)
      .reduce((acc, v) => acc && v, true);
  }

  private getValueForAbility(ability: Ability): ModifiableValue {
    const field = this.shadowRoot?.getElementById(
      `new-character-saving-throw-${ability}`
    )! as NumberProficientField;
    if (!field)
      return {
        value: 0,
        proficient: false,
      };
    return field.value;
  }

  private setValueForAbility(ability: Ability, value: ModifiableValue) {
    const field = this.shadowRoot?.getElementById(
      `new-character-saving-throw-${ability}`
    )! as NumberProficientField;
    field.value = { ...value };
  }

  private generateValues(
    abilityScores: AbilityScoresDecleration,
    proficiencyBonus: number
  ): SavingThrowsDecleration {
    const generated: Partial<SavingThrowsDecleration> = {};
    for (const ability of allAbilities) {
      const isProf = this.getValueForAbility(ability).proficient;
      let profBonus = proficiencyBonus;
      if (!isProf) {
        profBonus = 0;
      }

      generated[ability] = {
        proficient: isProf,
        value: getModifier(abilityScores[ability]) + profBonus,
      };
    }

    return generated as SavingThrowsDecleration;
  }

  render() {
    return html`
      <div class="fields">
        ${allAbilities.map(
          ability => html`
            <div class="container">
              <number-proficient-field
                name=${abilityShorthand[ability]}
                id=${`new-character-saving-throw-${ability}`}
              ></number-proficient-field>
            </div>
          `
        )}
      </div>
    `;
  }
}
