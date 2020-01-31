import { html, customElement, css, LitElement } from 'lit-element';
import * as firebase from 'firebase/app';

import logo from '../../assets/logo.svg';
import { store } from '../../redux/store';
import { connect } from 'pwa-helpers';
import { navigate } from '../../router/navigate';

@customElement('login-page')
export class LoginPage extends connect(store)(LitElement) {
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
        width: 280px;
        height: 280px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.05);
        font-family: var(--font-stack);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        padding: 20px;
      }
      .stripe {
        height: 4000px;
        width: 300px;
        background: var(--brand-gradient);
        transform: rotate(45deg) translate(-150px, 0);
      }
      .modal img {
        width: 64px;
        margin: 16px;
      }
      .modal h1 {
        margin: 0;
        color: var(--brand-secondary);
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
        background: var(--brand-secondary-light);
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
          throw Error('failed');
        }
        const user = {
          displayName: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          photoURL: result.user.photoURL,
          providerId: result.user.providerId,
          uid: result.user.uid,
        };
        store.dispatch({ type: 'UPDATE_USER', fields: user });
        navigate('/');
      })
      .catch(function(error) {
        alert(`could not sign you in, ${error.message}`);
      });
  }

  render() {
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
