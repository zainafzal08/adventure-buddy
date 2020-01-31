import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';

@customElement('text-field')
export class TextField extends connect(store)(LitElement) {
  @property() name: string = 'textField';
  @property() reflect: string = '';
  @property() value = '';
  @property() changeListener: (v: string) => void = () => {};

  @query('input') input!: HTMLInputElement;

  static get styles() {
    return css`
      :host {
        width: 100%;
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
      }

      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }

      .group input[type='text'] {
        border: none;
        outline: none;
        height: 1.6rem;
        width: 100%;
        background: none;
        color: #777;
        padding: 0.3rem 0;
        font-size: 1.1rem;
        border-bottom: 2px solid #ebebeb;
      }
      .group:focus-within input[type='text'] {
        border-bottom: 2px solid var(--theme-primary);
      }
    `;
  }

  stateChanged(state: AppState) {
    if (this.reflect === '') return;
    // Sue me.
    let val = state as any;
    for (const field of this.reflect.split('.')) {
      val = val[field];
    }
    this.value = val || '';
  }

  change() {
    this.changeListener(this.input.value);
    store.dispatch({
      type: 'DIRECT_SET',
      path: this.reflect,
      value: this.input.value,
    });
  }

  render() {
    return html`
      <div class="group">
        <label for="input">${this.name}</label>
        <input
          type="text"
          value=${this.value}
          @input=${() => this.change()}
        />
      </div>
    `;
  }
}
