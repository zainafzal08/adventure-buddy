import '../number-field/number-field';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../../redux/store';
import { AppState } from '../../../redux/reducer';
import { AttackDescriptor } from '../../../redux/characterDraft';

@customElement('attacks-input-field')
export class AttacksInputField extends connect(store)(LitElement) {
  @property() private attacks: AttackDescriptor[] = [];

  stateChanged(state: AppState) {
    this.attacks = state.characterDraft.attacks;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
      }
      h3 {
        margin: 0;
        padding: 0;
        color: var(--theme-primary);
        opacity: 0.9;
        font-weight: 500;
        margin-bottom: 16px;
      }
      .section {
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .table {
        flex-grow: 1;
        --table-row-height: 16px;
      }
      .row {
        height: var(--table-row-height);
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
      }
      .header {
        padding: 8px 0;
        border-bottom: 2px solid #ebebeb;
      }
      .header > span {
        color: #bbb;
      }
      .body {
        width: 100%;
        height: calc(100% - var(--table-row-height) - 2px - 16px);
        overflow-x: scroll;
      }
    `;
  }

  renderTableRow(attack: AttackDescriptor) {
    const { name, count, toHitFormula } = attack;
    return html`
      <div class="row">
        <span>${name}</span>
        <span>${count}</span>
        <div class="attack-type-cell"></div>
        <span>${toHitFormula}</span>
        <div class="attack-damage-cell"></div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="section">
        <h3>Attacks</h3>
        <div class="table">
          <div class="row header">
            <span>Name</span>
            <span>Count</span>
            <span>Type</span>
            <span>To Hit</span>
            <span>Damage</span>
          </div>
          <div class="body">
            ${this.attacks.map(attack => this.renderTableRow(attack))}
          </div>
        </div>
      </div>
      <div class="section">
        <h3>Add New Attacks</h3>
      </div>
    `;
  }
}
