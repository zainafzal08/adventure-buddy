import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('section-title')
export class SectionTitle extends LitElement {
  @property({type: String}) title = '';
  @property({type: String}) subtitle = '';
  @property({type: String}) icon = '';
  static get styles() {
      return css`
          :host {
            --img-size: 72px;
            --img-pad: 32px;
            --name-hpad: 16px;
            --name-font-size: 1.8rem;
            --descriptor-hpad: 0px;
            --descriptor-font-size: .8rem;
            width: 100%;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .img-wrapper {
            width: calc(var(--img-size) + 2*var(--img-pad));
            height: calc(var(--img-size) + 2*var(--img-pad));
            background: var(--theme-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .img-wrapper img {
            width: var(--img-size);
            height: var(--img-size);
            filter: invert();
            opacity: 0.45;
          }
          h1 {
            width: 100%;
            text-align: center;
            color: #444;
            font-weight: 100;
            font-family: 'Montserrat', sans-serif;
            margin: var(--name-hpad) 0px;
            font-size: var(--name-font-size);
          }
          p {
            width: 100%;
            text-align: center;
            color: #999;
            font-family: 'Montserrat', sans-serif;
            margin: var(--descriptor-hpad) 0px;
            font-size: var(--descriptor-font-size);
          }
      `;
  }

  render() {
    return html`
      <div class="img-wrapper">
          <img src="${this.icon}"/>
      </div>
      <h1>${this.title}</h1>
      <p>${this.subtitle}</p>
    `;
  }
}










