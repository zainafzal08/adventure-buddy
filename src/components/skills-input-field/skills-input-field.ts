import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import { Skill, allSkills } from '../../data/CharacterSheet';

@customElement('skills-input-field')
export class SkillsInputField extends connect(store)(LitElement) {
  stateChanged(state: AppState) {}

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
      h3 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        opacity: 0.9;
        font-weight: 500;
        margin-bottom: 8px;
        margin-top: 8px;
      }
    `;
  }

  render() {
    return html`
      <h3>Skills</h3>
      <div class="fields">
        ${allSkills.map(
          skill =>
            html`
              <number-proficient-field
                name=${skill}
              ></number-proficient-field>
            `
        )}
      </div>
    `;
  }
}
