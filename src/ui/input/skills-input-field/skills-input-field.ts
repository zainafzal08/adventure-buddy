import '../number-field/number-field';

import { html, customElement, css } from 'lit-element';
import {
  SkillsDeclaration,
  AbilityScoresDeclaration,
  ModifiableValue,
} from '../../../data/CharacterSheet';
import {
  allSkills,
  getSkillAbility,
  Skill,
} from '../../../data/skills';
import { NumberProficientField } from '../number-proficient-field/number-proficient-field';
import { getModifier } from '../../../data/ability';
import { all } from '../../../util';
import { BaseInput } from '../base-input';

@customElement('skills-input-field')
export class SkillsInputField extends BaseInput<SkillsDeclaration> {
  // BaseInput Implementation:
  getValue() {
    const skills: Partial<SkillsDeclaration> = {};
    for (const skill of allSkills) {
      skills[skill] = this.getValueForSkill(skill);
    }
    return skills as SkillsDeclaration;
  }

  setValue(skills: SkillsDeclaration) {
    for (const skill of allSkills) {
      this.setValueForSkill(skill, skills[skill]);
    }
  }

  clearValue() {
    for (const s of allSkills) {
      const input = this.shadowRoot?.getElementById(
        `new-character-skill-${s}`
      ) as NumberProficientField;
      input.clear();
    }
  }

  valueValid() {
    return all(allSkills.map(s => this.isSkillValid(s)));
  }

  // SkillsInputField Implementation:

  generateValues(scores: AbilityScoresDeclaration, profBonus: number) {
    const result: Partial<SkillsDeclaration> = {};
    for (const s of allSkills) {
      const proficient = this.value[s].proficient;
      const a = getSkillAbility(s);
      const rawModifier = getModifier(scores[a]);
      result[s] = {
        value: proficient ? rawModifier + profBonus : rawModifier,
        proficient,
      };
    }
    return result as SkillsDeclaration;
  }

  autofill(scores: AbilityScoresDeclaration, profBonus: number) {
    this.value = this.generateValues(scores, profBonus);
  }

  autofillImpossible(
    scores: AbilityScoresDeclaration,
    profBonus: number
  ) {
    const generated = this.generateValues(scores, profBonus);
    return allSkills
      .map(s => this.value[s].value === generated[s].value)
      .reduce((acc, v) => acc && v);
  }

  private getValueForSkill(skill: Skill): ModifiableValue {
    const field = this.shadowRoot?.getElementById(
      `new-character-skill-${skill}`
    )! as NumberProficientField;
    if (!field)
      return {
        value: 0,
        proficient: false,
      };
    return field.value;
  }

  private setValueForSkill(skill: Skill, value: ModifiableValue) {
    const field = this.shadowRoot?.getElementById(
      `new-character-skill-${skill}`
    )! as NumberProficientField;
    field.value = { ...value };
  }

  isSkillValid(s: Skill) {
    const field = this.shadowRoot?.getElementById(
      `new-character-skill-${s}`
    )! as NumberProficientField;
    return field.isValid();
  }

  // LitElement Implementation:
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
      number-proficient-field {
        width: calc(100% - 16px);
      }
    `;
  }

  render() {
    return html`
      <div class="fields">
        ${allSkills.map(
          skill =>
            html`
              <number-proficient-field
                id=${`new-character-skill-${skill}`}
                name=${skill}
              ></number-proficient-field>
            `
        )}
      </div>
    `;
  }
}
