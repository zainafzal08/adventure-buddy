import { LitElement, html, customElement, css } from 'lit-element';
import {
  AttackFeature,
  RangedFeature,
} from '../../../redux/characterDraft';
import { mdiFace } from '@mdi/js';

const testFeature: RangedFeature = {
  name: 'thrown',
  range: {
    normal: 30,
    long: 60,
  },
};

@customElement('attack-input-card')
export class AttackInputCard extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 350px;
        height: 350px;
        background: #ffffff;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        padding: 24px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: auto 100px 100px;
        grid-template-rows: 50px 30px 80px auto 30px;
        grid-template-areas:
          'title    skill    type'
          'features features features'
          'desc     desc     desc'
          'info     info     info'
          'blank    blank    action';
      }
      h1 {
        margin: 0;
        font-size: 1.3rem;
        color: #444;
        font-weight: 100;
        grid-area: title;
      }
      .features {
        width: 100%;
        display: flex;
      }
      .feature {
        width: 24px;
        height: 24px;
        margin-top: 0.7rem;
        background: var(--theme-gradient);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
      }
      .selected-class mdi-icon {
        opacity: 0.6;
      }
    `;
  }

  getIcon(icon: string) {
    return mdiFace;
  }

  renderFeature(feature: AttackFeature) {
    return html`
      <div class="feature">
        <mdi-icon
          size="14"
          color="rgba(255, 255, 255, 1)"
          icon=${this.getIcon(feature.name)}
        ></mdi-icon>
      </div>
    `;
  }
  render() {
    return html`
      <h1>Longsword</h1>
    `;
  }
}
