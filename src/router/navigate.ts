import { store } from '../redux/store';

export function navigate(path: string) {
  history.pushState('', '', path);
  store.dispatch({
    type: 'UPDATE_LOCATION',
    value: path,
  });
}
