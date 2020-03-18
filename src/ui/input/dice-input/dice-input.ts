import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { DiceDescriptor } from '../../../data/CharacterSheet';
import { BaseInput } from '../base-input';

@customElement('dice-input')
export class DiceInput extends BaseInput<DiceDescriptor> {
  @property() name: string = 'diceField';
  @property() id: string = '';
  @property() help: string = '';

  @query('#dice-count') diceCountElem!: HTMLInputElement;
  @query('#dice-type') diceTypeElem!: HTMLInputElement;

  // BaseInput Implementation
  getValue(): DiceDescriptor {
    let count = parseInt(this.diceCountElem?.value);
    if (isNaN(count)) count = 1;
    let type = parseInt(this.diceTypeElem?.value);
    if (isNaN(type)) type = 8;
    return { count, type };
  }

  setValue(v: DiceDescriptor) {
    this.diceCountElem.value = v.count.toString();
    this.diceTypeElem.value = v.type.toString();
  }

  clearValue() {
    this.value = {
      count: 1,
      type: 8,
    };
  }

  valueValid() {
    return this.help === '';
  }

  validate() {
    const { count, type } = this.value;
    this.help = '';
    this.toggleAttribute('invalid', false);
    if (isNaN(count) || isNaN(type)) {
      this.help = 'Values must be numbers';
    } else if (count <= 0 || type <= 0) {
      this.help = 'Values must be > 0';
    } else if (count > 99 || type > 99) {
      this.help = 'Values must be < 99';
    }

    this.toggleAttribute('invalid', this.help !== '');
  }

  // LitElement Implementation

  static get styles() {
    return css`
      :host {
        width: 100%;
        --border-color: var(--theme-primary);
      }
      .group {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
        text-transform: capitalize;
      }
      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }
      :host([invalid]) :focus-within label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      :host([invalid]) label {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
      }
      .input-container {
        width: 100%;
        height: calc(2.2rem + 2px);
        margin-bottom: 2px;
        font-size: 1.1rem;
        display: flex;
        align-items: flex-end;
        color: #bbb;
      }
      .input-container input {
        padding-bottom: calc(0.3rem + 2px);
        outline: none;
        border: none;
        background: none;
        font-size: 1.2rem;
        width: 100%;
        padding: 0 0.2rem;
        text-align: center;
        padding-bottom: 0.3rem;
        color: rgb(119, 119, 119);
        border-bottom: 2px solid #ebebeb;
      }
      .input-container span {
        padding: 0 8px;
        padding-bottom: calc(0.3rem + 2px);
        white-space: nowrap;
      }
      .input-container input:focus {
        outline: none;
        border-color: var(--border-color);
      }
      :host([invalid]) .input-container input {
        outline: none;
        --border-color: var(--theme-emphasis-low);
      }
      small {
        color: var(--theme-emphasis-low);
        opacity: 0.7;
        font-size: 0.5rem;
        margin-top: 0.3rem;
        height: 0.8rem;
      }
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    `;
  }

  render() {
    return html`
      <div class="group">
        <label>${this.name}</label>
        <div class="input-container">
          <input id="dice-count" class="left" value="1" type="number" />
          <span>x d</span>
          <input id="dice-type" class="right" value="8" type="number" />
        </div>
        <small>${this.help}</small>
      </div>
    `;
  }
}
