export interface Action {
  type:
    | 'UPDATE_THEME'
    | 'UPDATE_LOCATION'
    | 'UPDATE_USER'
    | 'CLEAR_USER'
    | 'UPDATE_DRAFT'
    | 'CLEAR_DRAFT';
}

export function update(obj: any, key: string, val: any) {
  return {
    ...obj,
    [key]: val,
  };
}
