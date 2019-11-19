import '../ui/app-link/app-link';

import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('error-page')
export class ErrorPage extends LitElement {
  @property({type: String}) message = 'Uh oh! Something went wrong';

  static get styles() {
      return css`
        .cover {
          width: 100%;
          height: calc(100vh - 2*var(--page-hpad) - var(--navbar-height) - 1px);
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        p {
          font-family: 'Montserrat', sans-serif;
          font-size: 3rem;
          color: var(--theme-primary);
          padding: 0;
          margin: 2rem;
          text-align: center;
        }
        button {
          padding: .5rem 1rem;
          background: white;
          border-radius: 5px;
          color: var(--theme-primary);
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          border: 2px solid var(--theme-primary);
          cursor: pointer;
        }
        button:hover {
          color: white;
          background: var(--theme-primary);
        }
        button:focus {
          outline: none;
        }
      `;
  }
  render() {
    return html`
      <div class="cover">
        <p> ${this.message} </p>
        <app-link target='/'>
          <button>Go Home</button>
        </app-link>
      </div>
    `;
  }
}










