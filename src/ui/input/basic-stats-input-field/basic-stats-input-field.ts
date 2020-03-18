import '../number-field/number-field';
import '../dice-input/dice-input';

import { LitElement, html, customElement, css } from 'lit-element';
import { DiceDescriptor } from '../../../data/CharacterSheet';
import { NumberField } from '../number-field/number-field';
import { DiceInput } from '../dice-input/dice-input';
import { BaseInput } from '../base-input';

interface BasicStats {
  maxHealth: number;
  hitDice: DiceDescriptor;
  ac: number;
  initative: number;
  speed: number;
}

@customElement('basic-stats-input-field')
export class BasicStatsInputField extends BaseInput<BasicStats> {
  // BaseInput Implementation:
  getValue(): BasicStats {
    const diceInput = this.shadowRoot?.getElementById(
      `new-character-hit-dice`
    ) as DiceInput;
    return {
      maxHealth: this.getVal('max-health'),
      hitDice: diceInput.value,
      ac: this.getVal('ac'),
      initative: this.getVal('initative'),
      speed: this.getVal('speed'),
    };
  }

  setValue(stats: BasicStats) {
    const diceInput = this.shadowRoot?.getElementById(
      `new-character-hit-dice`
    ) as DiceInput;
    diceInput.value = stats.hitDice;

    this.setVal('max-health', stats.maxHealth);
    this.setVal('ac', stats.ac);
    this.setVal('initative', stats.initative);
    this.setVal('speed', stats.speed);
  }

  clearValue() {
    const diceInput = this.shadowRoot?.getElementById(
      `new-character-hit-dice`
    ) as DiceInput;
    diceInput.clear();
    this.clearVal('max-health');
    this.clearVal('ac');
    this.clearVal('initative');
    this.clearVal('speed');
  }

  valueValid() {
    const diceInput = this.shadowRoot?.getElementById(
      `new-character-hit-dice`
    ) as DiceInput;
    return (
      diceInput.isValid() &&
      this.isValValid('max-health') &&
      this.isValValid('ac') &&
      this.isValValid('initative') &&
      this.isValValid('speed')
    );
  }

  // BaseStatsInputField Implementation:
  getVal(id: string): number {
    const input = this.shadowRoot?.getElementById(
      `new-character-${id}`
    ) as NumberField;
    return input.value;
  }

  setVal(id: string, val: number) {
    const input = this.shadowRoot?.getElementById(
      `new-character-${id}`
    ) as NumberField;
    input.value = val;
  }

  clearVal(id: string) {
    const input = this.shadowRoot?.getElementById(
      `new-character-${id}`
    ) as NumberField;
    input.clear();
  }

  isValValid(id: string) {
    const input = this.shadowRoot?.getElementById(
      `new-character-${id}`
    ) as NumberField;
    return input.isValid();
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .fields {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .container-med {
        width: calc(20% - 12px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    `;
  }

  render() {
    return html`
      <div class="fields">
        <div class="container-med">
          <number-field
            name="Max Health"
            id="new-character-max-health"
            .start=${1}
          ></number-field>
        </div>
        <div class="container-med">
          <dice-input
            name="Hit Dice"
            id="new-character-hit-dice"
          ></dice-input>
        </div>
        <div class="container-med">
          <number-field
            name="AC"
            id="new-character-ac"
            .start=${1}
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            name="Initiative"
            id="new-character-initative"
            .start=${0}
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            name="Speed"
            id="new-character-speed"
            .initial=${30}
            .start=${1}
          ></number-field>
        </div>
      </div>
    `;
  }
}
