import { LitElement, property, query } from 'lit-element';
import { AppState } from '../../../redux/reducer';
import { store } from '../../../redux/store';
import { connect } from 'pwa-helpers';

/**
 * The base input component exposes common logic for all input elements.
 * It allows subclasses to simply define a single function,
 * updateValue() which handles any change. The base will handle tracking
 * redux and input changes.
 */
export class BaseInput extends connect(store)(LitElement) {
  /**
   * What redux field this input field is reflecting.
   * If present the onChange callback is ignored.
   */
  @property() reflect: string = '';

  @property() initalValue: string = '';

  /** The raw input element we are wrapping. */
  @query('input') inputElement?: HTMLInputElement;

  private pendingValue: string | null = null;

  /**
   * Logic to handle the value of a field changing due to user input
   * or a redux state update. Can be overriden.
   */
  updateValue(newValue: string) {}

  // On any state change we sync the input with the redux state.
  stateChanged(state: AppState) {
    if (this.reflect === '') return;
    let val = state as any;
    for (const field of this.reflect.split('.')) {
      val = val[field];
    }

    if (this.inputElement) {
      this.inputElement.value = val || '';
    } else {
      this.pendingValue = val || '';
    }
    this.updateValue(val === undefined ? '' : val);
  }

  changeListener() {
    if (this.reflect) {
      store.dispatch({
        type: 'DIRECT_SET',
        path: this.reflect,
        value: this.inputElement!.value,
      });
    } else {
      this.updateValue(this.inputElement!.value);
    }
  }

  // Set up the base comment to watch and handle a input element.
  firstUpdated() {
    this.inputElement!.addEventListener('input', _ => {
      this.changeListener();
    });
    if (this.pendingValue !== null) {
      this.inputElement!.value = this.pendingValue;
      this.pendingValue = null;
    }
  }
}
