import { LitElement } from 'lit-element';
import { dispatchUpdatedValue } from '../../util';

export class BaseInput<T> extends LitElement {
  // Functions that children should override.

  /** Called to return the input value. */
  getValue(): T {
    throw new Error('No getValue defined on element.');
  }

  /** Called to set the input value. */
  setValue(v: T) {
    throw new Error('No setValue defined on element.');
  }

  /**
   * Clear the input value and put the input into a clean state.
   **/
  clearValue() {
    throw new Error('No clearValue defined on element.');
  }

  /** If this input is currently in a valid state. */
  valueValid() {
    return true;
  }

  /**
   * Called whenever the value changes after setValue. Can be used to
   * edit UI depending on validty of new state.
   */
  validate() {
    return;
  }

  /**
   * Called after first update and any saved values have been used to
   * populate the input field.
   */
  setup() {
    return;
  }

  // Public functions to be used by non children.

  get value(): T {
    return this.getValue();
  }

  set value(v: T) {
    this.setValue(v);
    this.valueChanged();
  }

  clear() {
    localStorage.removeItem(`saved-input-value(${this.id})`);
    this.clearValue();
  }

  isValid() {
    return this.valueValid();
  }

  // Internals.

  valueChanged() {
    dispatchUpdatedValue(this);
    this.backup();
    this.validate();
  }

  backup() {
    if (!this.id) return;
    localStorage.setItem(
      `saved-input-value(${this.id})`,
      JSON.stringify(this.value)
    );
  }

  loadFromLocalStorage() {
    if (!this.id) return false;
    const saved = localStorage.getItem(`saved-input-value(${this.id})`);
    if (!saved) {
      return false;
    }
    this.value = JSON.parse(saved);
    return true;
  }

  firstUpdated() {
    // There are only 2 events which we consider a indication of a
    // value change. If either occurs re-trigger setValue.
    this.addEventListener('input', () => {
      this.valueChanged();
    });
    this.addEventListener('value-updated', (e: Event) => {
      if (e.target === this) return;
      this.valueChanged();
    });

    // Set up.
    this.loadFromLocalStorage();

    // Let element itself do any set up.
    this.setup();
  }
}
