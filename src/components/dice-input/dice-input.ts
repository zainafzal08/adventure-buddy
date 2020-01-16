import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { store } from '../../redux/store';
import { connect } from 'pwa-helpers';
import { AppState } from '../../redux/reducer';

@customElement('dice-input')
export class DiceInput extends connect(store)(LitElement) {
  @property({ attribute: true }) name: string = 'diceField';
  @property() help: string = '';
  @property() reflect: string = '';
  @property() changeListener: (n: string, v: string) => void = () => {};
  @property() value: { number: string; type: string } = {
    number: '1',
    type: '8',
  };

  @query('#dice-num') diceNumElem!: HTMLInputElement;
  @query('#dice-type') diceTypeElem!: HTMLInputElement;

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
        margin-top: 1rem;
        margin-bottom: 1rem;
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
        width: 1.8rem;
        text-align: center;
        padding: 0 0.2rem;
        padding-bottom: 0.3rem;
        color: rgb(119, 119, 119);
        border-bottom: 2px solid #ebebeb;
      }
      .input-container span {
        padding-bottom: calc(0.3rem + 2px);
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
        font-size: 0.7rem;
        margin-top: 0.3rem;
        height: 0.8rem;
      }
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    `;
  }

  validate() {
    const number = parseInt(this.value.number);
    const type = parseInt(this.value.type);
    this.help = '';
    this.toggleAttribute('invalid', false);
    if (isNaN(number) || isNaN(type)) {
      this.help = 'Values must be numbers';
    } else if (number <= 0 || type <= 0) {
      this.help = 'Values must be > 0';
    } else if (number > 99 || type > 99) {
      this.help = 'Values must be < 99';
    }

    this.toggleAttribute('invalid', this.help !== '');
  }

  stateChanged(state: AppState) {
    if (this.reflect === '') return;
    // Sue me.
    let val = state as any;
    for (const field of this.reflect.split('.')) {
      val = val[field];
    }
    this.value = { ...val } || { number: 1, type: 8 };
    this.validate();
  }

  sync() {
    const number = this.diceNumElem.value;
    const type = this.diceTypeElem.value;
    this.changeListener(number, type);
    console.log(number, type);
    if (this.reflect) {
      store.dispatch({
        type: 'DIRECT_SET',
        path: this.reflect,
        value: { number, type },
      });
    } else {
      this.value = { number, type };
      this.validate();
    }
  }

  render() {
    return html`
      <div class="group">
        <label>${this.name}</label>
        <div class="input-container">
          <input
            id="dice-num"
            value=${this.value.number}
            @input=${() => this.sync()}
            type="number"
          />
          <span>x d</span>
          <input
            id="dice-type"
            value=${this.value.type}
            @input=${() => this.sync()}
            type="number"
          />
        </div>
        <small>${this.help}</small>
      </div>
    `;
  }
}
