
import {mdiDelete, mdiInformationOutline, mdiPencil} from '@mdi/js';
import {css, customElement, html, LitElement, property} from 'lit-element';

import {EquipmentItem} from '../../../data/CharacterSheet';
import {dispatch} from '../../../util';

@customElement('equipment-table')
export class EquipmentTable extends LitElement {
  @property() list: EquipmentItem[] = [];

  private readonly fields =
      ['Icon', 'Name', 'Count', 'Short Description', 'Actions'];

  static get styles() {
    return css`
          :host {
            width: 100%;
            box-sizing: border-box;
            padding: 16px;
            background: white;
            border: 2px solid #EBEBEB;
            border-radius: 15px;
          }
          .header {
            display: grid;
            grid-template-columns: 1fr 3fr 2fr 4fr 2fr;
          }
          .body {
            display: grid;
            grid-template-columns: 1fr 3fr 2fr 4fr 2fr;
            grid-auto-rows: 48px;
            height: 300px;
            overflow-y: scroll;
          }
          .heading {
            color: #bbb;
            width: 100%;
            font-size: .9rem;
            padding-bottom: 12px;
            border-bottom: 1px solid #EBEBEB;
          }
          .icon-container {
            display: flex;
            align-items: center;
          }
          .icon {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--theme-primary-light);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .text {
            color: #444;
            height: 100%;
            font-size: .9rem;
            display: flex;
            align-items: center;
          }
          .text > span {
            color: #ddd;
          }
          .actions {
            height: 100%;
            display: flex;
            align-items: center;
          }
          .action-btn {
            width: 32px;
            height: 32px;
            margin-right: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--theme-primary-light);
            --action-btn-color: var(--theme-primary);
          }
          .action-btn:hover {
            background: var(--theme-primary);
            --action-btn-color: white;
          }
      `;
  }

  itemEvent(type: string, item: EquipmentItem) {
    dispatch(this, `${type}-item`, {itemId: item.id});
  }

  renderRow(item: EquipmentItem) {
    return html`
      <div class="icon-container">
        <div class="icon">
          <mdi-icon
            icon=${item.icon}
            size=${22}
            color="var(--theme-primary)"
          ></mdi-icon>
        </div>
      </div>
      <div class="text">${item.name}</div>
      <div class="text">${item.count}</div>
      <div class="text">${
        item.shortDescription.length > 0 ? item.shortDescription :
                                           html`<span>Nothing...</span>`}</div>
      <div class="actions">
        <div class="action-btn" @click=${() => this.itemEvent('edit', item)}>
          <mdi-icon
            icon=${mdiPencil}
            size=${18}
            color="var(--action-btn-color)"></mdi-icon>
        </div>
        <div class="action-btn" @click=${() => this.itemEvent('remove', item)}>
        <mdi-icon
            icon=${mdiDelete}
            size=${18}
            color="var(--action-btn-color)"></mdi-icon>
        </div>
        <div class="action-btn" @click=${() => this.itemEvent('info', item)}>
        <mdi-icon
            icon=${mdiInformationOutline}
            size=${18}
            color="var(--action-btn-color)"></mdi-icon>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="header">
        ${this.fields.map(x => html`<div class="heading">${x}</div>`)}
      </div>
      <div class="body">
        ${this.list.map(i => this.renderRow(i))}
      </div>
    `;
  }
}
