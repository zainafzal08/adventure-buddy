export interface Action {
  type: 'UPDATE_THEME' | 'UPDATE_LOCATION';
}

export function update(obj: any, key: string, val: any) {
  return {
    ...obj,
    [key]: val,
  };
}
