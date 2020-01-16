import '../number-field/number-field';

import { LitElement, html, customElement, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import { CharacterSheetDraft } from '../../redux/characterDraft';

@customElement('additional-stats-input-field')
export class AdditionalStatsInputField extends connect(store)(
  LitElement
) {
  private draft!: CharacterSheetDraft;

  stateChanged(state: AppState) {
    this.draft = state.characterDraft;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        justify-content: flex-start;
      }
      .container-med {
        width: 25%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 8px;
      }
    `;
  }

  setStat(stat: string, v: number) {
    store.dispatch({
      type: 'UPDATE_DRAFT',
      fields: {
        [stat]: v,
      },
    });
  }

  render() {
    return html`
      <div class="container-med">
        <number-field
          name="Inspiration"
          .range=${[0]}
          reflect="characterDraft.inspiration"
        ></number-field>
      </div>
      <div class="container-med">
        <number-field
          name="Proficiency Bonus"
          .range=${[0]}
          reflect="characterDraft.profBonus"
        ></number-field>
      </div>
      <div class="container-med">
        <number-field
          name="Passive Wisdom"
          .range=${[0]}
          reflect="characterDraft.passiveWisdom"
        ></number-field>
      </div>
      <div class="container-med">
        <number-field
          name="XP"
          .range=${[0]}
          reflect="characterDraft.xp"
        ></number-field>
      </div>
    `;
  }
}
