import { html, customElement, css, LitElement } from 'lit-element';

@customElement('help-page')
export class HelpPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;
        font-family: var(--font-stack);
      }
      h1 {
        margin: 0;
        font-weight: 100;
        width: 100%;
        color: #999;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #ebebeb;
        font-family: var(--font-stack);
        margin-bottom: 32px;
      }
      .page {
        width: 800px;
        margin-top: 32px;
      }
      h1 span {
        color: var(--theme-primary);
      }
      h2 {
        color: var(--theme-primary);
        margin: 0;
        font-weight: 200;
      }
      h3 {
        margin: 8px 0;
        color: #555;
        font-size: 1rem;
      }
      p,
      li {
        color: #777;
      }
      li {
        margin: 16px 0;
      }
      li span {
        color: var(--theme-primary);
      }
      code {
        font-family: monospace;
        background: var(--theme-primary-medium);
        padding: 0 0.4rem;
        padding-bottom: 3px;
        border-radius: 15px;
      }
    `;
  }

  render() {
    return html`
      <h1>
        Even the best adventurers need some <span>Help</span> sometimes
      </h1>
      <div class="page">
        <h2>Searching for spells</h2>
        <p>
          When searching for spells you can add additional filters by
          using the filter syntax. Basically anywhere in your search
          query just chuck in a <code>filter_name: filter_value</code>.
          You can use any of the following filters!
        </p>
        <h3> Level </h3>
        <p>You can use something like <code>level: 4</code> to only search for spells that are level 4. This will not match spells that are lower leveled but can be cast with a 4th level spell slot however.</p>
        <h3> School </h3>
        <p>You can use something like <code>school: Evocation</code> to only search for spells that are from the evocation school of magic.</p>
        <h3> Class </h3>
        <p>You can use something like <code>class: Druid</code> to only search for spells that are in the druid spell list.</p>
        </ul>
      </div>
    `;
  }
}
