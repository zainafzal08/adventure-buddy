import '../number-field/number-field';
import { LitElement, html, customElement, css } from 'lit-element';
import { NumberField } from '../number-field/number-field';

interface AdditionalStats {
  inspiration: number;
  proficiencyBonus: number;
  passiveWisdom: number;
  xp: number;
}

@customElement('additional-stats-input-field')
export class AdditionalStatsInputField extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .fields {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .container-med {
        width: calc(25% - 8px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    `;
  }

  getVal(id: string): number {
    const input = this.shadowRoot?.getElementById(
      `new-character-${id}`
    ) as NumberField;
    if (!input) return 0;
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

  get value(): AdditionalStats {
    return {
      inspiration: this.getVal('inspiration'),
      proficiencyBonus: this.getVal('prof-bonus'),
      xp: this.getVal('xp'),
      passiveWisdom: this.getVal('passive-wisdom'),
    };
  }

  set value(stats: AdditionalStats) {
    this.setVal('inspiration', stats.inspiration);
    this.setVal('prof-bonus', stats.proficiencyBonus);
    this.setVal('xp', stats.xp);
    this.setVal('passive-wisdom', stats.passiveWisdom);
  }

  clear() {
    this.clearVal('inspiration');
    this.clearVal('prof-bonus');
    this.clearVal('xp');
    this.clearVal('passive-wisdom');
  }

  isValid() {
    return (
      this.isValValid('inspiration') &&
      this.isValValid('prof-bonus') &&
      this.isValValid('xp') &&
      this.isValValid('passive-wisdom')
    );
  }

  render() {
    return html`
      <div class="fields">
        <div class="container-med">
          <number-field
            id="new-character-inspiration"
            name="Inspiration"
            .start=${0}
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            id="new-character-prof-bonus"
            name="Proficiency Bonus"
            .start=${0}
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            id="new-character-passive-wisdom"
            name="Passive Wisdom"
            .start=${0}
          ></number-field>
        </div>
        <div class="container-med">
          <number-field
            id="new-character-xp"
            name="XP"
            .start=${0}
          ></number-field>
        </div>
      </div>
    `;
  }
}
