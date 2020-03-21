import {
  html,
  customElement,
  css,
  LitElement,
  query,
} from 'lit-element';
import { TerrainGenerator } from './TerrainGenerator';

@customElement('world-builder')
export class WorldBuilder extends LitElement {
  @query('.canvas-container') canvasContainer!: HTMLDivElement;

  private generator!: TerrainGenerator;

  static get styles() {
    return css`
      :host {
        width: 100%;
        font-family: var(--font-stack);
        --canvas-width: 950px;
      }
      .header {
        height: 96px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
      .content {
        width: 100%;
        height: calc(100% - 96px - 16px);
        margin-bottom: 16px;
        display: flex;
      }
      .options {
        width: calc(100% - 32px - var(--canvas-width));
        margin-right: 32px;
        height: 100%;
        background: white;
        border-radius: 16px;
        border: 2px solid #ebebeb;
      }
      .canvas-container {
        width: var(--canvas-width);
        border: 2px solid #ebebeb;
        border-radius: 16px;
        background: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .canvas-container canvas {
        border-radius: 16px;
      }

      h1 {
        margin: 0;
        width: 100%;
        font-weight: 100;
        color: #999;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #ebebeb;
      }
      h1 span {
        color: var(--theme-primary);
      }
    `;
  }

  firstUpdated() {
    const {
      width,
      height,
    } = this.canvasContainer.getBoundingClientRect();
    this.generator = new TerrainGenerator(width, height - 4);
    this.canvasContainer.innerHTML = '';

    this.generator.generate();
    this.canvasContainer.appendChild(this.generator.getDomElement());
    this.generator.render();
  }

  render() {
    return html`
      <div class="header">
        <h1>
          Rome wasn't built in a day, but <span>Your World</span> might
          be
        </h1>
      </div>
      <div class="content">
        <div class="options"></div>
        <div class="canvas-container">
          <app-spinner></app-spinner>
        </div>
      </div>
    `;
  }
}
