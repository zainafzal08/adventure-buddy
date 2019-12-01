import { html, customElement, css } from 'lit-element';
import * as firebase from 'firebase/app';

import { AsyncElement } from '../../AsyncElement';
import logo from '../../assets/logo.svg';
import { getNavigateEvent, getLoginEvent } from '../../util';

@customElement('login-page')
export class LoginPage extends AsyncElement {
  private auth = {
    google: new firebase.auth.GoogleAuthProvider(),
  };

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
      }
      .container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .modal {
        width: 300px;
        height: 300px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.05);
        font-family: var(--font-stack);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      }
      .stripe {
        height: 4000px;
        width: 300px;
        background: var(--brand-gradient);
        transform: rotate(45deg) translate(-150px, 0);
      }
      .modal img {
        width: 64px;
        margin: 16px 0;
      }
      .modal h1 {
        margin: 0;
        color: var(--theme-primary);
        font-size: 1.5rem;
        font-weight: 100;
      }
      .modal p {
        color: #bbb;
        font-size: 0.8rem;
        margin: 0.5rem;
      }
      button {
        width: 150px;
        font-size: 12px;
        color: white;
        background: var(--theme-primary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        outline: none;
        border: none;
        margin-top: 50px;
        cursor: pointer;
        transition: all 0.3s;
      }
    `;
  }

  login() {
    firebase
      .auth()
      .signInWithPopup(this.auth.google)
      .then(result => {
        if (!result.user) {
          // TODO(zain): Make this more descriptive.
          throw Error('failed');
        }
        this.dispatchEvent(getLoginEvent(result.user));
      })
      .catch(function(error) {
        alert(`could not sign you in, ${error.message}`);
      });
  }

  template() {
    return html`
      <div class="container">
        <div class="stripe"></div>
      </div>
      <div class="container">
        <div class="modal">
          <img src=${logo} />
          <h1>Adventure Buddy</h1>
          <p>Your friend through the world of dnd</p>
          <button @click=${this.login}>Sign in with Google</button>
        </div>
      </div>
    `;
  }
}