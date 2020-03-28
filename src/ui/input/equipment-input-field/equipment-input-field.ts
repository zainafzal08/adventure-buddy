import './new-item-dialog';
import './equipment-item-card';

import {
  html,
  customElement,
  css,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { BaseInput } from '../base-input';
import { EquipmentItem } from '../../../data/CharacterSheet';
import { NewItemDialog } from './new-item-dialog';
import hikingHumaan from '../../../assets/humaaans/hiking.svg';

@customElement('equipment-input-field')
export class EquipmentInputField extends BaseInput<EquipmentItem[]> {
  @property() list: EquipmentItem[] = [];

  @query('new-item-dialog') newItemDialog!: NewItemDialog;

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
      const e = ue as CustomEvent<{ item: EquipmentItem }>;
      this.list = [...this.list, { ...e.detail.item }];
    });

    this.addEventListener('remove-item', ue => {
      const e = ue as CustomEvent<{ itemId: string }>;
      const id = e.detail.itemId;
      this.list = this.list.filter(x => x.id !== id);
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

  render() {
    let content: TemplateResult[] = [];

    if (this.list.length === 0) {
      content = [this.zeroState()];
    } else {
      content = this.list.map(
        item =>
          html`
            <equipment-item-card .item=${item}></equipment-item-card>
          `
      );
    }

    return html`
      ${content}
      <new-item-dialog></new-item-dialog>
    `;
  }
}
