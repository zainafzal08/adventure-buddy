import * as allIcons from '@mdi/js';
import {css, customElement, html, LitElement, property, query,} from 'lit-element';

import {EquipmentItem} from '../../../data/CharacterSheet';
import {AppModal} from '../../components/app-modal/app-modal';

const BLOBS: string[] = [
  'M189.2,-108.1C220.8,-54.5,205.2,27.5,165.8,98.6C126.4,169.7,63.2,229.8,-6.5,233.6C-76.2,237.3,-152.4,184.7,-189.7,114.8C-226.9,45,-225.2,-42,-187.1,-99.3C-149,-156.7,-74.5,-184.3,2.2,-185.6C78.8,-186.8,157.6,-161.7,189.2,-108.1Z',
  'M204.1,-117.5C237.3,-60.3,218.2,27.3,175.5,97.5C132.8,167.7,66.4,220.3,0,220.3C-66.4,220.3,-132.8,167.7,-162.4,105.1C-192,42.5,-184.8,-30,-151.6,-87.2C-118.4,-144.3,-59.2,-186.2,13.1,-193.7C85.4,-201.3,170.9,-174.7,204.1,-117.5Z',
  'M151.8,-120.4C187.9,-75.8,202.1,-13.2,189.3,43.2C176.4,99.6,136.4,149.8,82.1,179.3C27.9,208.7,-40.5,217.4,-91,192C-141.5,166.5,-174.1,106.8,-183.6,47.1C-193,-12.6,-179.4,-72.4,-144.9,-116.6C-110.5,-160.8,-55.2,-189.4,1.3,-190.4C57.9,-191.5,115.7,-164.9,151.8,-120.4Z',
  'M133.7,-147C168.9,-98.5,189.9,-49.3,197.6,7.7C205.2,64.6,199.5,129.2,164.3,172.3C129.2,215.5,64.6,237.2,0.1,237.1C-64.3,237,-128.7,215,-170.9,171.9C-213,128.7,-233,64.3,-230.9,2.1C-228.8,-60.1,-204.5,-120.2,-162.4,-168.7C-120.2,-217.2,-60.1,-254.1,-5.4,-248.7C49.3,-243.3,98.5,-195.5,133.7,-147Z',
];

/**
 * A very simple hash so we can give each card the same blob each
 * time we render it without needing to keep track of it.
 */
function dumbHash(s: string) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result += s.charCodeAt(i);
  }
  return result;
}

@customElement('equipment-item-card')
export class EquipmentItemCard extends LitElement {
  @property({type: Object}) item!: EquipmentItem;

  @query('app-modal') private modal!: AppModal;

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  getBlob() {
    if (!this.item) return '';

    const blobIndex = dumbHash(this.item.id) % BLOBS.length;
    const blob = BLOBS[blobIndex];
    return html`
      <svg
        width="600"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
      >
        <g transform="translate(300, 300)">
          <path d=${blob} fill="var(--blob-color)" />
        </g>
      </svg>
    `;
  }

  static get styles() {
    return css`
      .card {
        width: 450px;
        height: 550px;
        background: white;
        box-shadow: var(--soft-box-shadow);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        font-style: var(--font-stack);
        --blob-color: var(--theme-primary-light);
        position: relative;
        overflow: hidden;
      }
      .header {
        width: 100%;
        height: 250px;
        box-sizing: border-box;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }
      .body {
        width: 100%;
        height: calc(100% - 350px);
        padding: 0 16px;
        box-sizing: border-box;
      }
      svg {
        width: 350px;
        height: 350px;
        position: absolute;
        left: -115px;
        top: -115px;
      }
      .header > mdi-icon {
        margin-top: 32px;
        margin-left: 32px;
      }
      .close-btn {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
      }
      .close-btn:hover {
        background: #f6f6f6;
      }
      h1 {
        font-size: 1.5rem;
        padding: 0 0 0 16px;
        margin: 0;
        color: var(--theme-primary);
      }
      .subtitle {
        padding: 8px 16px 0 16px;
        margin: 0;
        font-size: 1rem;
        color: #999;
      }
      .desc {
        box-sizing: border-box;
        padding: 16px 16px 0 16px;
        margin: 0;
        font-size: 1rem;
        color: #777;
        height: 200px;
        overflow-y: scroll;
      }
      .empty {
        color: #ddd;
      }
      sup {
        margin-left: 8px;
        font-size: .9rem;
      }
    `;
  }

  getSubtitle() {
    if (this.item.shortDescription)
      return html`<p class="subtitle">${this.item.shortDescription}</p>`;
    return html`<p class="subtitle empty">No short description for this one</p>`;
  }

  getDescription() {
    if (this.item.detailedDescription)
      return html`<p class="desc">${this.item.detailedDescription}</p>`;
    return html`<p class="desc empty">No detailed description for this one</p>`;
  }

  getCount() {
    return html`<sup>x ${this.item.count}</sup>`;
  }

  card() {
    return html`
      <div class="card">
        ${this.getBlob()}
        <div class="header">
          <mdi-icon
            size="64"
            color="var(--theme-primary"
            icon=${this.item.icon}
          ></mdi-icon>
          <div class="close-btn" @click=${() => this.hide()}>
            <mdi-icon
              size="24"
              color="#bbb"
              icon=${allIcons.mdiClose}
            ></mdi-icon>
          </div>
        </div>
        <div class="body">
          <h1>${this.item.name}${this.getCount()}</h1>
          ${this.getSubtitle()}
          ${this.getDescription()}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <app-modal>
        ${this.item ? this.card() : ''}
      </app-modal>
    `;
  }
}
