import './pages/app-home/app-home';
import './pages/login-page/login-page';
import './pages/settings-page/settings-page';

import { Route } from './router/app-router';
import { html } from 'lit-html';

export const ROUTES: Route[] = [
  {
    path: '/',
    component: () =>
      html`
        <app-home></app-home>
      `,
  },
  {
    path: '/settings',
    component: () =>
      html`
        <settings-page></settings-page>
      `,
  },
  {
    path: '/login',
    component: () =>
      html`
        <login-page></login-page>
      `,
  },
];
