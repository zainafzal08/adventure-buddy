import '../icon-selector/icon-selector';
import '../extended-text-field/extended-text-field';
import '../text-field/text-field';
import '../number-field/number-field';

import {mdiCheck, mdiClose, mdiCrystalBall, mdiFlaskOutline, mdiFoodAppleOutline, mdiNecklace, mdiSack, mdiScriptOutline, mdiShieldHalfFull, mdiSword,} from '@mdi/js';
import {css, customElement, html, LitElement, property, query,} from 'lit-element';
import {uuid} from 'uuidv4';

import {EquipmentItem} from '../../../data/CharacterSheet';
import {dispatch, ValueUpdatedDetail} from '../../../util';
import {AppModal} from '../../components/app-modal/app-modal';
import {BaseInput} from '../base-input';
import {IconSelector} from '../icon-selector/icon-selector';

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
  @property() edit: Boolean = false;

  private itemId: string|null = null;

  @query('app-modal') modal!: AppModal;
  @query('icon-selector') iconSelector!: IconSelector;

  show() {
    this.itemId = uuid();
    this.edit = false;
    this.modal.show();
  }

  showEdit(item: EquipmentItem) {
    // Prefil.
    this.itemId = item.id;
    this.setText('name', item.name);
    this.setNum('count', item.count);
    this.setText('short-description', item.shortDescription);
    this.setText('detailed-description', item.detailedDescription);
    this.iconSelector.value = item.icon;

    this.edit = true;
    this.modal.show();
  }

  getText(id: string) {
    const e =
        this.shadowRoot?.getElementById(`new-item-${id}`) as BaseInput<string>;
    return e.value;
  }

  setText(id: string, text: string) {
    const e =
        this.shadowRoot?.getElementById(`new-item-${id}`) as BaseInput<string>;
    e.value = text;
  }

  getNum(id: string) {
    const e =
        this.shadowRoot?.getElementById(`new-item-${id}`) as BaseInput<number>;
    return e.value;
  }

  setNum(id: string, num: number) {
    const e =
        this.shadowRoot?.getElementById(`new-item-${id}`) as BaseInput<number>;
    e.value = num;
  }

  clearElem(id: string) {
    const e =
        this.shadowRoot?.getElementById(`new-item-${id}`) as BaseInput<unknown>;
    return e.clear();
  }

  clear() {
    this.iconSelector.clear();
    this.clearElem('name');
    this.clearElem('count');
    this.clearElem('short-description');
    this.clearElem('detailed-description');
  }

  cancel() {
    this.modal.hide();
  }

  done() {
    this.modal.hide();
    const item: EquipmentItem = {
      id: this.itemId!,
      icon: this.iconSelector.value,
      name: this.getText('name'),
      count: this.getNum('count'),
      shortDescription: this.getText('short-description'),
      detailedDescription: this.getText('detailed-description'),
    };
    let type = 'new-item';
    if (this.edit) {
      type = 'update-item';
    }
    dispatch(this, type, {item});
    this.clear();
  }

  static get styles() {
    return css`
      :host {
      }
      .card {
        width: 450px;
        height: 575px;
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
      .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .row *:first-child {
        width: 60%;
      }
      .row *:last-child {
        width: calc(40% - 8px);
      }
      number-field {
        margin-top: 16px;
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
            ${this.edit ? html`<h1>Edit Item</h1>` : html`<h1>New Item</h1>`}
          </div>
          <div class="body">
            <label>Icon</label>
            <icon-selector
              id="new-item-icon"
              .options=${ICONS}
            ></icon-selector>
            <div class="row">
              <text-field
                id="new-item-name"
                name="Item Name"
                initial="My Item"
                placeholder="Health Potion"
                @value-updated=${(e: Event) => {
      const v = (e as CustomEvent<ValueUpdatedDetail>).detail.value;
      this.valid = v !== '';
    }}></text-field>
                <number-field id="new-item-count" name="Count" start=${
        1}></number-field>
            </div>
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
