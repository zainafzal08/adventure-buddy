import '../number-proficient-field/number-proficient-field';

import { LitElement, html, customElement, css } from 'lit-element';
import {
  allAbilities,
  abilityShorthand,
  Ability,
  getModifier,
} from '../../../data/ability';
import {
  SavingThrowsDeclaration,
  AbilityScoresDeclaration,
  ModifiableValue,
} from '../../../data/CharacterSheet';
import { NumberProficientField } from '../number-proficient-field/number-proficient-field';
import { all } from '../../../util';
import { BaseInput } from '../base-input';

@customElement('saving-throw-input-field')
export class SavingThrowInputField extends BaseInput<
  SavingThrowsDeclaration
> {
  // BaseInput Implementation:

  getValue(): SavingThrowsDeclaration {
    const savingThrows: Partial<SavingThrowsDeclaration> = {};
    for (const ability of allAbilities) {
      savingThrows[ability] = this.getValueForAbility(ability);
    }
    return savingThrows as SavingThrowsDeclaration;
  }

  setValue(savingThrows: SavingThrowsDeclaration) {
    for (const ability of allAbilities) {
      this.setValueForAbility(ability, savingThrows[ability]);
    }
  }

  clearValue() {
    for (const a of allAbilities) {
      const input = this.shadowRoot?.getElementById(
        `new-character-saving-throw-${a}`
      ) as NumberProficientField;
      input.clear();
    }
  }

  valueValid() {
    return all(allAbilities.map(a => this.isValueValid(a)));
  }

  // SavingThrowInputField Implementation:

  isValueValid(a: Ability) {
    const input = this.shadowRoot?.getElementById(
      `new-character-saving-throw-${a}`
    ) as NumberProficientField;
    return input.isValid();
  }

  autofill(
    abilityScores: AbilityScoresDeclaration,
    proficiencyBonus: number
  ) {
    this.value = this.generateValues(abilityScores, proficiencyBonus);
  }

  autofillImpossible(
    abilityScores: AbilityScoresDeclaration,
    proficiencyBonus: number
  ) {
    const generated = this.generateValues(
      abilityScores,
      proficiencyBonus
    );
    return allAbilities
      .map(a => this.value[a].value === generated[a].value)
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
    abilityScores: AbilityScoresDeclaration,
    proficiencyBonus: number
  ): SavingThrowsDeclaration {
    const generated: Partial<SavingThrowsDeclaration> = {};
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

    return generated as SavingThrowsDeclaration;
  }

  // LitElement Implementation:

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
