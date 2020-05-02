import './new-item-dialog';
import './equipment-item-card';
import '../../components/equipment-table/equipment-table';

import {css, customElement, html, property, query,} from 'lit-element';

import hikingHumaan from '../../../assets/humaaans/hiking.svg';
import {EquipmentItem} from '../../../data/CharacterSheet';
import {BaseInput} from '../base-input';

import {EquipmentItemCard} from './equipment-item-card';
import {NewItemDialog} from './new-item-dialog';

@customElement('equipment-input-field')
export class EquipmentInputField extends BaseInput<EquipmentItem[]> {
  @property() list: EquipmentItem[] = [];

  @query('new-item-dialog') newItemDialog!: NewItemDialog;
  @query('equipment-item-card') equipmentItemCard!: EquipmentItemCard;

  // BaseInput Implmentation:
  getValue() {
    return this.list;
  }

  setValue(list: EquipmentItem[]) {
    this.list = [...list];
  }

  clearValue() {
    this.list = [];
    this.newItemDialog.clear();
  }

  setup() {
    this.addEventListener('new-item', ue => {
      const e = ue as CustomEvent<{item: EquipmentItem}>;
      this.value = [...this.value, {...e.detail.item}];
    });

    this.addEventListener('remove-item', ue => {
      const e = ue as CustomEvent<{itemId: string}>;
      const id = e.detail.itemId;
      this.value = this.value.filter(x => x.id !== id);
    });

    this.addEventListener('info-item', ue => {
      const e = ue as CustomEvent<{itemId: string}>;
      const id = e.detail.itemId;
      const item = this.value.find(x => x.id === id);
      if (!item) return;
      this.equipmentItemCard.item = item;
      this.equipmentItemCard.show();
    });

    this.addEventListener('edit-item', ue => {
      const e = ue as CustomEvent<{itemId: string}>;
      const id = e.detail.itemId;
      const item = this.value.find(i => i.id === id);
      if (!item) return;
      this.newItemDialog.showEdit(item);
    });

    this.addEventListener('update-item', ue => {
      const e = ue as CustomEvent<{item: EquipmentItem}>;
      const newItem = e.detail.item;
      let oldItemIndex = this.value.findIndex(i => i.id === newItem.id);
      if (oldItemIndex === -1) return;
      this.value[oldItemIndex] = newItem;
      this.value = this.value;
    });
  }

  // EquipmentInputField Implmentation:
  openNewItemDialog() {
    this.newItemDialog.show();
  }

  // LitElement Implmentation:
  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
      }
    `;
  }

  zeroState() {
    return html`
      <img class="zero-state" src=${hikingHumaan} />
    `;
  }

  table() {
    return html`<equipment-table .list=${this.list}></equipment-table>`;
  }

  render() {
    return html`
      ${this.list.length === 0 ? this.zeroState() : this.table()}
      <new-item-dialog></new-item-dialog>
      <equipment-item-card></equipment-item-card>
    `;
  }
}
