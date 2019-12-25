export interface Action {
  type: 'UPDATE_THEME';
}

export function update(obj: any, key: string, val: any) {
  return {
    ...obj,
    [key]: val,
  };
}
