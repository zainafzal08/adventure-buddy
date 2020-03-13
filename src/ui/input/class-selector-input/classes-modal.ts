import {
  html,
  customElement,
  css,
  query,
  LitElement,
  property,
} from 'lit-element';
import { AppModal } from '../../components/app-modal/app-modal';
import { NumberField } from '../number-field/number-field';
import {
  ClassSelection,
  CLASSES,
  ClassDescriptor,
} from '../../../data/classes';
import { getIcon, dispatch } from '../../../util';
import { mdiChevronRight, mdiChevronLeft, mdiPlus } from '@mdi/js';

@customElement('classes-modal')
export class ClassesModal extends LitElement {
  @query('app-modal') modal!: AppModal;
  @property() selected: ClassSelection[] = [];
  @property() private draft: ClassSelection | null = null;

  // ClassesModal Impplementation:
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

  updateDraftLevel(event: CustomEvent) {
    this.draft = {
      ...this.draft!,
      level: event.detail.value,
    };
  }

  addClassToList() {
    dispatch(this, 'class-selection', {
      ...this.draft,
    });
    this.draft = null;
    this.modal.hide();
    this.toggleAttribute('chosen', false);
  }

  isLevelValid() {
    const id = 'new-character-new-class-level';
    const field = this.shadowRoot?.getElementById(id) as NumberField;
    if (!field) return false;
    return field.isValid();
  }

  show() {
    this.modal.show();
  }
  // LitElement Implementation:

  static get styles() {
    return css`
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

  renderClassSelection(key: string, c: ClassDescriptor) {
    return html`
      <div class="item" @click=${() => this.selectClass(key)}>
        <div class="left">
          <div class="class-icon">
            <mdi-icon
              size="18"
              color="white"
              icon=${getIcon(c.icon)}
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

  renderPageOne() {
    const alreadySelected = this.selected.map(x => x.id);
    const classList = Object.entries(CLASSES)
      .filter(([k, _]) => alreadySelected.indexOf(k) === -1)
      .map(([k, c]) => this.renderClassSelection(k, c));

    return html`
      <div class="header">
        <h1>Pick a class</h1>
      </div>
      <div class="body">
        ${classList}
      </div>
    `;
  }

  renderPageTwo() {
    return html`
      <div class="header">
        <h1>Pick a class</h1>
      </div>
      <div class="body">
        <div class="wrapper">
          <number-field
            id="new-character-new-class-level"
            name="Level"
            start=${1}
            @value-updated=${this.updateDraftLevel}
          ></number-field>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <app-modal>
        <div class="card">
          ${this.draft === null
            ? this.renderPageOne()
            : this.renderPageTwo()}
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
                    @click=${() => this.addClassToList()}
                    icon=${mdiPlus}
                    primary="true"
                    ?disabled=${!this.isLevelValid()}
                    >Add</icon-btn
                  >
                `
              : null}
          </div>
        </div>
      </app-modal>
    `;
  }
}
