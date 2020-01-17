import '../../components/app-modal/app-modal';
import '../../components/icon-btn/icon-btn';
import '../../components/number-field/number-field';

import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';

import '../icon-btn/icon-btn';
import {
  mdiCloseCircle,
  mdiPlusCircle,
  mdiChevronRight,
  mdiChevronLeft,
  mdiPlus,
} from '@mdi/js';
import * as mdiAll from '@mdi/js';
import { CharacterClass } from '../../data/CharacterSheet';
import { AppModal } from '../../components/app-modal/app-modal';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';
import { AppState } from '../../redux/reducer';
import { getDatabase, ClassDescriptor } from '../../data/Database';

@customElement('class-selector')
export class ClassSelector extends connect(store)(LitElement) {
  @property() selected: CharacterClass[] = [];
  @query('app-modal') modal!: AppModal;
  @property() draft: CharacterClass | null = null;

  private db = getDatabase();

  static get styles() {
    return css`
      :host {
        width: 100%;
        --chip-height: 24px;
      }
      .group {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        width: 100%;
      }
      label {
        font-size: 0.8rem;
        color: #aaa;
      }

      .group:focus-within label {
        color: var(--theme-primary);
        opacity: 0.7;
      }

      .container {
        width: 100%;
        height: 40px;
        padding: 0.3rem 0;
        display: flex;
        align-items: flex-end;
        border-bottom: 2px solid #ebebeb;
        margin-bottom: 4px;
        overflow-x: scroll;
      }

      .chip {
        border-radius: 15px;
        margin-right: 8px;
        width: fit-content;
        height: var(--chip-height);
        background: var(--theme-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      }
      .chip:hover {
        box-shadow: var(--theme-primary-shadow);
      }
      .chip span {
        font-size: 0.8rem;
        padding: 0 8px 0 12px;
        color: white;
        white-space: nowrap;
      }
      .chip mdi-icon {
        margin-right: 8px;
        cursor: pointer;
      }
      .chip.new-class {
        background: var(--theme-primary-light);
      }
      .chip.new-class mdi-icon {
        margin-left: 4px;
        margin-right: 0;
        cursor: pointer;
      }
      .chip.new-class span {
        padding: 0 8px;
        color: var(--theme-primary);
      }
      .card {
        width: 350px;
        height: 500px;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
      }
      .header {
        width: 100%;
        height: 48px;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        background: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
      }
      .body {
        width: 100%;
        height: calc(100% - 48px - 48px);
        overflow: scroll;
      }
      .footer {
        width: calc(100% - 32px);
        padding: 0 16px;
        height: 48px;
        background: #fafafa;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.05);
      }
      :host([chosen]) .header {
        box-shadow: none;
      }
      :host([chosen]) .card {
        height: 200px;
      }
      :host([chosen]) .footer {
        box-shadow: none;
      }
      .card h1 {
        margin: 0;
        padding: 0;
        color: #777;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 100;
      }
      .item {
        display: flex;
        width: calc(100% - 32px);
        margin: 0 16px;
        height: 100px;
        border-bottom: 2px solid #ebebeb;
        cursor: pointer;
        --icon-ink: #bbb;
        --icon-background: #ebebeb;
      }
      .item:hover {
        --icon-ink: white;
        --icon-background: var(--theme-primary);
      }
      .item .left {
        width: 48px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .class-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: var(--theme-gradient);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .class-icon mdi-icon {
        opacity: 0.5;
      }
      .item .right {
        width: calc(100% - 96px - 16px);
        margin-left: 16px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .item .action {
        width: 32px;
        margin-left: 16px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item p {
        width: 100%;
        font-size: 0.9rem;
        color: #777;
        margin: 0;
        margin-bottom: 4px;
      }
      .item small {
        width: 100%;
        color: #bbb;
        font-size: 0.7rem;
      }
      .item:last-child {
        border-bottom: none;
      }
      .wrapper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
      }
    `;
  }

  stateChanged(state: AppState) {
    this.selected = state.characterDraft.classes;
  }

  syncRedux() {
    store.dispatch({
      type: 'UPDATE_DRAFT',
      fields: {
        classes: [...this.selected],
      },
    });
  }

  removeSelection(id: number) {
    this.selected = this.selected.filter((_, i) => id !== i);
    this.syncRedux();
  }

  newClass() {
    this.modal.show();
  }

  getName(id: string) {
    return this.db.getClass(id).name;
  }

  getIcon(icon: string) {
    // Captilize.
    let iconStr = icon.substr(0, 1).toUpperCase() + icon.substr(1);
    // To camelcase.
    iconStr = iconStr.replace(/\-\w/g, (match: string) => {
      return match.replace('-', '').toUpperCase();
    });
    return (mdiAll as { [k in string]: string })[`mdi${iconStr}`];
  }

  selectClass(key: string) {
    this.draft = { id: key, level: 1 };
    this.toggleAttribute('chosen', true);
  }

  goBack() {
    if (this.draft) {
      this.draft = null;
      this.toggleAttribute('chosen', false);
    } else {
      this.modal.hide();
    }
  }

  renderClassSelection(key: string, c: ClassDescriptor) {
    return html`
      <div class="item" @click=${() => this.selectClass(key)}>
        <div class="left">
          <div class="class-icon">
            <mdi-icon
              size="18"
              color="white"
              icon=${this.getIcon(c.icon)}
            ></mdi-icon>
          </div>
        </div>
        <div class="right">
          <p>${c.name}</p>
          <small>${c.tagline}</small>
        </div>
        <div class="action">
          <mdi-icon
            size="16"
            color="var(--icon-ink)"
            background="var(--icon-background)"
            icon=${mdiChevronRight}
          ></mdi-icon>
        </div>
      </div>
    `;
  }

  renderLevelPrompt() {
    return html`
      <div class="wrapper">
        <number-field
          name="Level"
          .range=${[1]}
          .changeListener=${(v: string) => {
            let level = parseInt(v);
            if (isNaN(level)) {
              level = 0;
            }
            this.draft = { ...this.draft!, level };
          }}
          value=${1}
        ></number-field>
      </div>
    `;
  }

  addClassToList() {
    this.selected.push({ ...this.draft! });
    this.draft = null;
    this.modal.hide();
    this.toggleAttribute('chosen', false);
    this.syncRedux();
  }

  renderModal() {
    const alreadySelected = this.selected.map(x => x.id);
    return html`
      <app-modal>
        <div class="card">
          <div class="header">
            <h1>
              ${this.draft
                ? `Set your ${this.getName(this.draft.id)} level`
                : 'Pick a class'}
            </h1>
          </div>
          <div class="body">
            ${this.draft
              ? this.renderLevelPrompt()
              : this.db
                  .allClasses()
                  .filter(([k, _]) => alreadySelected.indexOf(k) === -1)
                  .map(([k, c]) => this.renderClassSelection(k, c))}
          </div>
          <div class="footer">
            <icon-btn
              size="small"
              icon=${mdiChevronLeft}
              @click=${() => this.goBack()}
              >Back</icon-btn
            >
            ${this.draft
              ? html`
                  <icon-btn
                    size="small"
                    @click=${this.draft.level > 0
                      ? () => this.addClassToList()
                      : () => {}}
                    icon=${mdiPlus}
                    primary="true"
                    disabled=${!(this.draft.level > 0)}
                    >Add</icon-btn
                  >
                `
              : null}
          </div>
        </div>
      </app-modal>
    `;
  }

  render() {
    return html`
      <div class="group">
        <label>Classes</label>
        <div class="container">
          ${this.selected.map(
            (c, i) => html`
              <div class="chip" @click=${() => this.removeSelection(i)}>
                <span>Lv. ${c.level} ${this.getName(c.id)}</span>
                <mdi-icon
                  size="16"
                  color="white"
                  icon=${mdiCloseCircle}
                ></mdi-icon>
              </div>
            `
          )}
          <div class="chip new-class" @click=${() => this.newClass()}>
            <mdi-icon
              size="16"
              color="var(--theme-primary)"
              icon=${mdiPlusCircle}
            ></mdi-icon>
            <span>Add</span>
          </div>
        </div>
      </div>
      ${this.renderModal()}
    `;
  }
}
