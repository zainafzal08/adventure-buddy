export function exhaustiveCheck(param: never) {
  param;
}

/** Returns the first value in the object. */
export function first(obj: object) {
  return Object.values(obj)[0];
}
