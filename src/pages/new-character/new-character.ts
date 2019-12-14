import '../../components/character-card/character-card';
import '../../components/text-field/text-field';

import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property,
} from 'lit-element';
import {
  CharacterSheetDescriptor,
  Ability,
} from '../../data/CharacterSheet';

/**
 * A field is simply some input field that generates mutations,
 * the field registers this mutations by calling the provided mutate
 * function.
 */
interface Step {
  title: TemplateResult;
  fields: (() => TemplateResult)[];
}

const NEW_CHARACTER_FLOW: Step[] = [
  {
    title: html`
      Lets start with the <span>Basics<span></span></span>
    `,
    fields: [
      () =>
        html`
          <text-field name="Character Name" field="name"></text-field>
        `,
    ],
  },
];

@customElement('new-character')
export class NewCharacter extends LitElement {
  @property() character: CharacterSheetDescriptor = {
    id: null,
    name: '',
    race: '',
    class: '',
    level: -1,
    baseAC: -1,
    speed: -1,
    proficiencyBonus: -1,
    ability: {
      [Ability.DEX]: -1,
      [Ability.STR]: -1,
      [Ability.CHR]: -1,
      [Ability.CON]: -1,
      [Ability.INT]: -1,
      [Ability.WIS]: -1,
    },
    specialBonus: {},
    proficiencies: [],
  };

  private currentStep: number = 1;

  static get styles() {
    return css`
      :host {
        font-family: var(--font-stack);
        height: 100%;
        width: 100%;
      }
      .heading {
        height: 10%;
        margin-bottom: 16px;
      }
      h1 {
        margin: 0;
        font-weight: 100;
        color: #999;
        padding-bottom: 1rem;
      }
      h1 span {
        color: var(--theme-primary);
      }
      .heading .progress-bar {
        background: #ebebeb;
        height: 2px;
        width: 100%;
      }
      .heading .progress {
        background: var(--theme-primary);
        height: 100%;
      }
      .construction-space {
        width: 100%;
        height: 90%;
        display: flex;
      }
      .form-space,
      .preview-space {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .form-fields {
        height: 600px;
        width: calc(100% - 64px);
        padding: 0 32px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
    `;
  }

  /**
   * The current progress the user is at in the new character flow
   * as a percentage out of 100.
   */
  progress() {
    return (this.currentStep / NEW_CHARACTER_FLOW.length) * 100;
  }

  getTitle() {
    return NEW_CHARACTER_FLOW[this.currentStep - 1].title;
  }

  getFields() {
    return NEW_CHARACTER_FLOW[this.currentStep - 1].fields.map(field =>
      field()
    );
  }

  firstUpdated() {
    this.addEventListener('mutation', (e: Event) => {
      const mutations = (e as CustomEvent).detail;
      for (const { field, value } of mutations) {
        this.characterMutation({
          [field]: value,
        });
      }
    });
  }

  characterMutation(mutation: Partial<CharacterSheetDescriptor>) {
    this.character = {
      ...this.character,
      ...mutation,
    };
  }

  render() {
    return html`
      <div class="heading">
        <h1>
          ${this.getTitle()}
        </h1>
        <div class="progress-bar">
          <div
            class="progress"
            style=${`width: ${this.progress}%`}
          ></div>
        </div>
      </div>
      <div class="construction-space">
        <div class="form-space">
          <div class="form-fields">
            ${this.getFields()}
          </div>
        </div>
        <div class="preview-space">
          <character-card .character=${this.character}></character-card>
        </div>
      </div>
    `;
  }
}
