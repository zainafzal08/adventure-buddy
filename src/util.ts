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
