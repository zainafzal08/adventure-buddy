import '../../ui/input/text-field/text-field';
import '../../ui/components/class-selector/class-selector';
import '../../ui/input/race-selection-field/race-selection-field';
import '../../ui/input/ability-score-input-field/ability-score-input-field';
import '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import '../../ui/input/skills-input-field/skills-input-field';

import { LitElement, html, customElement, css } from 'lit-element';

@customElement('new-character')
export class NewCharacter extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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
        width: 800px;
      }
    `;
  }

  render() {
    return html`
      <h1>Let's get the <span>Basics</span> Down</h1>
      <div class="form-fields">
        <text-field></text-field>
        <class-selector></class-selector>
        <race-selection-field></race-selection-field>
        <ability-score-input-field></ability-score-input-field>
        <basic-stats-input-field></basic-stats-input-field>
        <additional-stats-input-field></additional-stats-input-field>
        <saving-throw-input-field></saving-throw-input-field>
        <skills-input-field></skills-input-field>
      </div>
    `;
  }
}
