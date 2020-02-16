import { html, customElement, css, LitElement } from 'lit-element';
import '../../components/class-selector/class-selector';
import '../../ui/input/text-field/text-field';

@customElement('import-character')
export class ImportCharacter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        font-family: var(--font-stack);
        --header-height: 100px;
      }
      h1 {
        margin: 0;
        width: 100%;
        font-weight: 100;
        color: #999;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #ebebeb;
        font-family: var(--font-stack);
        margin-bottom: 32px;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .sheet {
        width: 550px;
        height: 750px;
        border-radius: 15px;
        box-sizing: border-box;
        padding: 32px 0px;
        background: white;
        box-shadow: var(--soft-box-shadow);
        margin-bottom: 16px;
      }
      .row {
        width: 100%;
        display: flex;
      }
      .header {
        height: var(--header-height);
        align-items: center;
        margin-bottom: 16px;
      }
      .name {
        width: 60%;
        height: 80px;
        background: var(--theme-primary);
        box-sizing: border-box;
        padding: 0 16px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        box-shadow: var(--theme-primary-shadow-high);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.9rem;
        color: white;
      }
      .name input {
        background: none;
        border: none;
        font-size: 1rem;
        font-family: var(--font-stack);
        color: white;
        border-radius: 15px;
        width: 100%;
      }
      .name input:focus {
        outline: none;
      }
      .name input::placeholder {
        color: #ffffff99;
      }
      .details {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .details > * {
        box-sizing: border-box;
        padding: 0 16px;
      }
      class-selector {
        margin-right: 8px;
      }
    `;
  }

  render() {
    return html`
      <h1>Ditch the <span>paper</span> here</h1>
      <div class="sheet">
        <div class="row header">
          <div class="name">
            <input placeholder="Character Name" />
          </div>
        </div>
        <div class="row">
          <class-selector></class-selector>
          <text-field name="Race"></text-field>
        </div>
        <div class="row">
          <text-field name="Background"></text-field>
          <text-field name="Alignment"></text-field>
          <text-field name="Experience"></text-field>
        </div>
      </div>
    `;
  }
}
