import { LitElement, html, customElement, css } from 'lit-element';
import icons from '../../assets/icons/*.svg';

@customElement('login-modal')
export class LoginModal extends LitElement {

  static get styles() {
      return css`
        .cover {
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
        }
        .modal {
            width: 350px;
            height: 250px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19),
                0 6px 6px rgba(0,0,0,0.23);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            padding: 32px;
        }
        h1 {
            color: #444;
            font-family: 'Montserrat', sans-serif;
            font-weight: 100;
            margin: 0;
            font-size: 1.5rem;
        }
        hr {
            width: 100%;
            height: 2px;
            background: #EBEBEB;
            opacity: .8;
            border-radius: 2px;
            outline: none;
            border: none;
            margin: 1.2rem 0rem 1rem 0rem;
        }
        img {
            width: 96px;
        }
        .row {
            display: flex;
            justify-content: space-around;
        }
        .login-option {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: var(--brand-gradient);
        }
      `;
  }

  render() {
    return html`
      <div class="cover">
        <div class="modal">
            <img src="${icons['logo']}"/>
            <h1> Adventure Buddy </h1> 
            <hr>
            <div class="row">
                <div class="login-option">

                </div>
            </div>
        </div>
      </div>
    `;
  }
}