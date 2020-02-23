import '../../ui/components/character-card/character-card';
import '../../ui/input/text-field/text-field';
import '../../ui/components/class-selector/class-selector';
import '../../ui/input/race-selection-field/race-selection-field';
import '../../ui/input/ability-score-input-field/ability-score-input-field';
import '../../ui/input/basic-stats-input-field/basic-stats-input-field';
import '../../ui/input/additional-stats-input-field/additional-stats-input-field';
import '../../ui/input/saving-throw-input-field/saving-throw-input-field';
import '../../ui/input/skills-input-field/skills-input-field';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { CharacterSheetDraft } from '../../redux/characterDraft';
import { AppState } from '../../redux/reducer';

@customElement('new-character')
export class NewCharacter extends connect(store)(LitElement) {
  @property() draft!: CharacterSheetDraft;

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

  stateChanged(state: AppState) {
    this.draft = state.characterDraft;
  }

  render() {
    return html`
      <h1>Let's get the <span>Basics</span> Down</h1>
      <div class="form-fields">
        <text-field
          name="Character Name"
          reflect="characterDraft.name"
        ></text-field>
        <class-selector></class-selector>
        <race-selection-field></race-selection-field>
        <ability-score-input-field></ability-score-input-field>
        <basic-stats-input-field></basic-stats-input-field>
        <additional-stats-input-field></additional-stats-input-field>
        <saving-throw-input-field></saving-throw-input-field>
        <skills-input-field></skills-input-field>
      </div>
      </div>
    `;
  }
}
