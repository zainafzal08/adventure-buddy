import '../icon-selector/icon-selector';
import '../extended-text-field/extended-text-field';

import {
  html,
  customElement,
  css,
  query,
  LitElement,
  property,
} from 'lit-element';
import { AppModal } from '../../components/app-modal/app-modal';
import { dispatch, ValueUpdatedDetail } from '../../../util';
import { IconSelector } from '../icon-selector/icon-selector';
import {
  mdiFlaskOutline,
  mdiFoodAppleOutline,
  mdiSword,
  mdiCrystalBall,
  mdiShieldHalfFull,
  mdiScriptOutline,
  mdiNecklace,
  mdiSack,
  mdiClose,
  mdiCheck,
} from '@mdi/js';
import { BaseInput } from '../base-input';
import { EquipmentItem } from '../../../data/CharacterSheet';
import { uuid } from 'uuidv4';

const ICONS = [
  mdiFlaskOutline,
  mdiFoodAppleOutline,
  mdiSword,
  mdiCrystalBall,
  mdiShieldHalfFull,
  mdiScriptOutline,
  mdiNecklace,
  mdiSack,
];

@customElement('new-item-dialog')
export class NewItemDialog extends LitElement {
  @property() valid: Boolean = true;

  @query('app-modal') modal!: AppModal;
  @query('icon-selector') iconSelector!: IconSelector;

  show() {
    this.modal.show();
  }

  getText(id: string) {
    const e = this.shadowRoot?.getElementById(
      `new-item-${id}`
    ) as BaseInput<string>;
    return e.value;
  }

  clearText(id: string) {
    const e = this.shadowRoot?.getElementById(
      `new-item-${id}`
    ) as BaseInput<string>;
    return e.clear();
  }

  clear() {
    this.iconSelector.clear();
    this.clearText('name');
    this.clearText('short-description');
    this.clearText('detailed-description');
  }

  cancel() {
    this.modal.hide();
  }

  done() {
    this.modal.hide();
    // Should be equipmentItem.
    const item: EquipmentItem = {
      id: uuid(),
      icon: this.iconSelector.value,
      name: this.getText('name'),
      shortDescription: this.getText('short-description'),
      detailedDescription: this.getText('detailed-description'),
    };
    dispatch(this, 'new-item', { item });
    this.clear();
  }

  static get styles() {
    return css`
      :host {
      }
      .card {
        width: 450px;
        height: 550px;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 32px 32px 16px 32px;
        display: flex;
        flex-direction: column;
        --header-height: 48px;
        --footer-height: 32px;
      }
      .header {
        width: 100%;
        height: var(--header-height);
      }
      .footer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        height: var(--footer-height);
      }
      .body {
        width: 100%;
        height: calc(
          100% - var(--header-height) - var(--footer-height)
        );
      }
      h1 {
        color: var(--theme-primary);
        padding: 0;
        margin: 0;
        font-size: 26px;
      }
      label {
        color: #bbb;
        font-size: 0.8rem;
      }
      text-field {
        margin-bottom: 8px;
      }
    `;
  }

  render() {
    return html`
      <app-modal>
        <div class="card">
          <div class="header">
            <h1>New Item</h1>
          </div>
          <div class="body">
            <label>Icon</label>
            <icon-selector
              id="new-item-icon"
              .options=${ICONS}
            ></icon-selector>
            <text-field
              id="new-item-name"
              name="Item Name"
              initial="My Item"
              placeholder="Health Potion"
              @value-updated=${(e: Event) => {
                const v = (e as CustomEvent<ValueUpdatedDetail>).detail
                  .value;
                this.valid = v !== '';
              }}
            ></text-field>
            <text-field
              id="new-item-short-description"
              name="Short Description"
              placeholder="Restore 1d6 HP etc."
              canBeEmpty=${true}
            ></text-field>
            <extended-text-field
              id="new-item-detailed-description"
              name="Detailed Description"
              .rows=${5}
            ></extended-text-field>
          </div>
          <div class="footer">
            <icon-btn
              size="small"
              color="var(--theme-primary)"
              icon=${mdiClose}
              @click=${() => this.cancel()}
              >Cancel</icon-btn
            >
            <icon-btn
              size="small"
              color="var(--theme-primary)"
              icon=${mdiCheck}
              ?primary=${true}
              ?disabled=${!this.valid}
              @click=${() => this.done()}
              >Done</icon-btn
            >
          </div>
        </div>
      </app-modal>
    `;
  }
}
