// Imports with side effects.
import './character-sheet/character-sheet';

// Named imports.
import { LitElement, html, customElement, query, css } from 'lit-element';
import { CharacterSheet } from './character-sheet/character-sheet';

@customElement('app-view')
export class AppView extends LitElement {
  @query('character-sheet') characterSheet!:CharacterSheet;
  
  private theme = 'peach';

  static get styles() {
    return css`
      :host {
        --peach-theme-gradient: linear-gradient(110deg, #f2709c, #ff9472);
        --fresh-theme-gradient: linear-gradient(45deg, #67b26f, #4ca2cd);
      }
    `;
  }

  render() {
    // This will edventually have a bunch of top level routes
    // and the login flow leading to the home page where you can
    // create new character sheets / characters
    return html`
      <style>
        :host {
          --theme-gradient: var(--${this.theme}-theme-gradient)
        }
      </style>
      <character-sheet></character-sheet>
    `;
  }
}