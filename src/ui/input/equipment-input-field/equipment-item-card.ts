import {
  html,
  customElement,
  css,
  LitElement,
  property,
} from 'lit-element';
import { EquipmentItem } from '../../../data/CharacterSheet';

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
export class EquipmentInputField extends LitElement {
  @property({ type: Object }) item!: EquipmentItem;

  getBlob() {
    console.log(BLOBS);
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

  deleteSelf() {}

  expand() {}

  static get styles() {
    return css`
      :host {
        width: 300px;
        height: 300px;
        border-radius: 15px;
        border: 2px solid #ebebeb;
        background: white;
        --preview-description-height: 64px;
        --blob-color: var(--theme-primary-medium);
      }
      .preview-body {
        width: 100%;
        height: calc(100% - var(--preview-description-height));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-body svg {
        width: 150px;
        height: 150px;
      }
      .preview-description {
        width: 100%;
        height: var(--preview-description-height);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
      .preview-description h4 {
        color: var(--theme-primary);
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      .preview-description p {
        color: #bbb;
        width: 100%;
        text-align: center;
        margin-top: 8px;
        font-size: 0.8rem;
        margin: 0;
        padding: 0;
      }
    `;
  }

  render() {
    return html`
      <div class="preview-body">
        ${this.getBlob()}
      </div>
      <div class="preview-description">
        <h4>${this.item.name}</h4>
        <p>${this.item.shortDescription}</p>
      </div>
      </div>
    `;
  }
}
