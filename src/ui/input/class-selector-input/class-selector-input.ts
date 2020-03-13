import '../../components/icon-btn/icon-btn';
import '../../components/app-modal/app-modal';
import './classes-modal';

import { html, customElement, css, property, query } from 'lit-element';

import { mdiCloseCircle, mdiPlusCircle } from '@mdi/js';
import { ClassSelection, getClassName } from '../../../data/classes';
import { BaseInput } from '../base-input';
import { ClassesModal } from './classes-modal';

@customElement('class-selector-input')
export class ClassSelectorInput extends BaseInput<ClassSelection[]> {
  @property() selected: ClassSelection[] = [];
  @property() id: string = '';
  @property() private help: string = '';

  @query('classes-modal') modal!: ClassesModal;

  // BaseInput Implementation:
  getValue(): ClassSelection[] {
    return [...this.selected];
  }

  setValue(selected: ClassSelection[]) {
    this.selected = [...selected];
  }

  clearValue() {
    this.selected = [];
  }

  valueValid() {
    return this.selected.length > 0;
  }

  validate() {
    this.help = '';
    if (this.selected.length < 1) {
      this.help = 'You must select at least 1 class';
    }
  }

  // ClassSelectionInput Implementation:
  removeSelection(id: number) {
    this.value = this.value.filter((_, i) => id !== i);
  }

  addSelection(s: ClassSelection) {
    this.value = [...this.value, s];
  }

  newClass() {
    this.modal.show();
  }

  // LitElement Implementation:

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
      small {
        margin-top: 8px;
        color: var(--theme-emphasis-low);
        height: 1rem;
        font-size: 0.65rem;
      }
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
                <span>Lv. ${c.level} ${getClassName(c.id)}</span>
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
      <small>${this.help}</small>
      <classes-modal
        .selected=${this.selected}
        @class-selection=${(e: CustomEvent<ClassSelection>) =>
          this.addSelection(e.detail)}
      ></classes-modal>
    `;
  }
}
