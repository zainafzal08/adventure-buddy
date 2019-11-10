import { LitElement, html, customElement, css } from 'lit-element';
import icons from '../../assets/icons/*.svg';

@customElement('app-nav')
export class AppNav extends LitElement {

  static get styles() {
      return css`
          :host {
            width: calc(100% - 30px);
            padding: 0 15px;
            height: var(--navbar-height);
            border-bottom: 2px solid #EBEBEB;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
          }
          .left {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .right {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .profile {
            width: 30px;
            height: 30px;
            background: var(--theme-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .profile img {
            height: 20px;
            filter: invert();
            opacity: .65;
            margin-bottom: 2px;
          }
          app-link {
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            color: var(--theme-primary);
            margin: 0 .5rem;
          }
      `;
  }

  render() {
    return html`
      <div class="left">
        <app-link target='/'>Home</app-link>
        <app-link target='/handbook'>Handbook</app-link>
      </div>
      <div class="right">
        <app-link target='/profile'>
          <div class="profile">
            <img src="${icons['account']}"/>
          </div>
        </app-link>
      </div>
    `;
  }
}










