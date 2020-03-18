import * as mdiAll from '@mdi/js';

interface InputElement extends HTMLElement {
  id: string;
  value: any;
}

export interface ValueUpdatedDetail {
  source: string;
  id: string;
  value: any;
}
export type ValueUpdatedEvent = CustomEvent<ValueUpdatedDetail>;

export function exhaustiveCheck(param: never) {
  param;
}

/** Returns the first value in the object. */
export function first(obj: object) {
  return Object.values(obj)[0];
}

/** Returns true of all values in a array are true. */
export function all(a: boolean[]) {
  return a.reduce((acc, v) => acc && v, true);
}

/** Returns an array containing numbers a to b inclusive. */
export function range(a: number, b: number) {
  const size = b - a + 1;
  return new Array(size).fill(0).map((_, i) => a + i);
}

/** Dispatches a event. */
export function dispatch(
  target: HTMLElement,
  type: string,
  detail: Object = {}
) {
  target.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail,
    })
  );
}

/** Dispatches value changed event */
export function dispatchUpdatedValue(target: InputElement) {
  dispatch(target, 'value-updated', {
    source: target.tagName,
    id: target.id,
    value: target.value,
  });
}

/** Gets a icon given a lower case snake case name. */
export function getIcon(icon: string) {
  // Captilize.
  let iconStr = icon.substr(0, 1).toUpperCase() + icon.substr(1);
  // To camelcase.
  iconStr = iconStr.replace(/\-\w/g, (match: string) => {
    return match.replace('-', '').toUpperCase();
  });
  return (mdiAll as { [k in string]: string })[`mdi${iconStr}`];
}
