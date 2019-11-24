import {
  LitElement,
  html,
  customElement,
  css,
  property,
} from 'lit-element';
import { CharacterSheetData } from '../../database';
import { renderModifier } from '../../util';

@customElement('quick-stats')
export class QuickStats extends LitElement {
  @property() sheet!: CharacterSheetData;

  static get styles() {
    return css`
      :host {
        --box-size: 64px;
        --focused-box-size: 96px;
        --inbetween-margin: 16px;
        --stat-font-size: 1.5rem;
        --focused-stat-font-size: 2.2rem;
        --label-font-size: 0.7rem;
        margin: 48px 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Montserrat', sans-serif;
      }
      .container {
        height: 100%;
        margin: 0 var(--inbetween-margin);
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      small {
        color: #777;
        margin: 8px 0;
        font-size: var(--label-font-size);
      }
      .mod-neutral {
        color: #ccc;
      }
      .mod-low {
        color: var(--theme-emphasis-low);
      }
      .mod-high {
        color: var(--theme-emphasis-high);
      }
      .stat {
        width: var(--box-size);
        height: var(--box-size);
        background: white;
        border: 2px solid #ebebeb;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--stat-font-size);
        color: var(--theme-emphasis);
      }
      .focused {
        width: var(--focused-box-size);
        height: var(--focused-box-size);
        font-size: var(--focused-stat-font-size);
      }

      @media all and (max-width: 550px) {
        :host {
          --inbetween-margin: 8px;
          --box-size: 52px;
          --focused-box-size: 64px;
          --stat-font-size: 1.2rem;
          --focused-stat-font-size: 1.8rem;
        }
      }
      @media all and (max-width: 370px) {
        :host {
          --box-size: 48px;
          --inbetween-margin: 8px;
          --focused-box-size: 64px;
          --stat-font-size: 1.2rem;
          --focused-stat-font-size: 1.5rem;
          --label-font-size: 0.5rem;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="stat">${this.sheet.getInitative()}</div>
        <small> Inspiration </small>
      </div>
      <div class="container">
        <div class="stat">
          ${renderModifier(this.sheet.getSkillModifier('perception'))}
        </div>
        <small> Perception </small>
      </div>
      <div class="container">
        <div class="stat focused">${this.sheet.getArmorClass()}</div>
        <small> Armor Class </small>
      </div>
      <div class="container">
        <div class="stat">
          ${renderModifier(this.sheet.getInitative())}
        </div>
        <small> Initative </small>
      </div>
      <div class="container">
        <div class="stat">${this.sheet.getSpeed()}</div>
        <small> Speed </small>
      </div>
    `;
  }
}
