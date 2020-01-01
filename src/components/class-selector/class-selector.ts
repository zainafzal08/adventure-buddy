import { LitElement, html, customElement, css } from 'lit-element';

import '../icon-btn/icon-btn';
import { mdiPlus } from '@mdi/js';

@customElement('class-selector')
export class ClassSelector extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .group {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;
        margin: 4px;
      }
      label {
        font-size: 10px;
        color: #aaa;
      }

      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }

      .container {
        width: 100%;
        height: 1.05rem;
        display: flex;
        border-bottom: 2px solid #ebebeb;
        margin-bottom: 4px;
      }
    `;
  }

  render() {
    return html`
      <div class="group">
        <div class="container">
          <icon-btn size="small" icon=${mdiPlus}>Add</icon-btn>
        </div>
        <label>Class</label>
      </div>
    `;
  }
}
