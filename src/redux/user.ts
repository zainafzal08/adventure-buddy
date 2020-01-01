import { Action } from './helpers';

export type User = firebase.UserInfo | null;

export interface UserAction extends Action {
  fields: Partial<firebase.UserInfo>;
}

export const initialUserState: User = null;

export function userReducer(user: User, action: UserAction): User {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...user,
        ...action.fields,
      } as User;
    case 'CLEAR_USER':
      return null;
    default:
      return user;
  }
}
