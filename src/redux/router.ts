import { update, Action } from './helpers';

export interface Router {
  location: string;
}

export interface RouterAction extends Action {
  value: string;
}

export const initialRouterState: Router = {
  location: window.location.pathname,
};

export function routerReducer(
  router: Router,
  action: RouterAction
): Router {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return update(router, 'location', action.value);
    default:
      return router;
  }
}
