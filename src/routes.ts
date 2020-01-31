import './pages/app-home/app-home';
import './pages/login-page/login-page';
import './pages/settings-page/settings-page';
import './pages/new-character/new-character';

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
    public: true,
    component: () =>
      html`
        <login-page></login-page>
      `,
  },
  {
    path: '/character/new',
    component: () =>
      html`
        <new-character></new-character>
      `,
  },
];
