import { html, customElement, css } from 'lit-element';
import { BaseInput } from '../base-input';
import { NumberField } from '../number-field/number-field';
import { Wallet } from '../../../data/CharacterSheet';

@customElement('currency-input-field')
export class CurrencyInputField extends BaseInput<Wallet> {
  // BaseInput Implementation:
  getValue() {
    return {
      platinum: this.getField('platinium')?.value,
      gold: this.getField('gold')?.value,
      electrum: this.getField('electrum')?.value,
      silver: this.getField('silver')?.value,
      copper: this.getField('copper')?.value,
    };
  }

  /** Called to set the input value. */
  setValue(value: Wallet) {
    if (!this.getField('platinium')) return;
    this.getField('platinium').value = value.platinum;
    this.getField('gold').value = value.gold;
    this.getField('electrum').value = value.electrum;
    this.getField('silver').value = value.silver;
    this.getField('copper').value = value.copper;
  }

  /**
   * Clear the input value and put the input into a clean state.
   **/
  clearValue() {
    if (!this.getField('platinium')) return;
    this.getField('platinium').clear();
    this.getField('gold').clear();
    this.getField('electrum').clear();
    this.getField('silver').clear();
    this.getField('copper').clear();
  }

  /** If this input is currently in a valid state. */
  valueValid() {
    if (!this.getField('platinium')) return false;
    return (
      this.getField('platinium').isValid() &&
      this.getField('gold').isValid() &&
      this.getField('electrum').isValid() &&
      this.getField('silver').isValid() &&
      this.getField('copper').isValid()
    );
  }

  // CurrencyInputField Implementation:
  getField(id: string) {
    return this.shadowRoot?.querySelector(
      `#new-character-currency-${id}`
    ) as NumberField;
  }

  generateValues(): Wallet {
    let total =
      this.value.platinum * 1000 +
      this.value.gold * 100 +
      this.value.electrum * 50 +
      this.value.silver * 10 +
      this.value.copper;

    const result: Partial<Wallet> = {};

    result.platinum = Math.floor(total / 1000);
    total = total % 1000;

    result.gold = Math.floor(total / 100);
    total = total % 100;

    result.electrum = Math.floor(total / 50);
    total = total % 50;

    result.silver = Math.floor(total / 10);
    total = total % 10;

    result.copper = total;

    return result as Wallet;
  }

  autoExchangeImpossible() {
    if (!this.isValid()) return true;
    const generated = this.generateValues();
    return (
      this.value.platinum === generated.platinum &&
      this.value.gold === generated.gold &&
      this.value.electrum === generated.electrum &&
      this.value.silver === generated.silver &&
      this.value.copper === generated.copper
    );
  }

  autoExchange() {
    if (!this.isValid()) return;
    this.value = this.generateValues();
  }

  // LitElement Implementation:
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      :host > * {
        width: calc(100% / 5 - 8px);
      }
    `;
  }

  render() {
    return html`
      <number-field
        id="new-character-currency-platinium"
        name="Platinum"
        .start=${0}
      ></number-field>
      <number-field
        id="new-character-currency-gold"
        name="Gold"
        .start=${0}
      ></number-field>
      <number-field
        id="new-character-currency-electrum"
        name="Electrum"
        .start=${0}
      ></number-field>
      <number-field
        id="new-character-currency-silver"
        name="Silver"
        .start=${0}
      ></number-field>
      <number-field
        id="new-character-currency-copper"
        name="Copper"
        .start=${0}
      ></number-field>
    `;
  }
}
