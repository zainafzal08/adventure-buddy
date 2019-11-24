import {
  LitElement,
  property,
  TemplateResult,
  html,
} from 'lit-element';
import { nothing } from 'lit-html';

export class AsyncElement extends LitElement {
  @property() ready: boolean = false;
  @property() err: boolean = false;
  @property() errContext: any = null;

  firstUpdated() {
    this.init()
      .then(() => {
        this.ready = true;
      })
      .catch(e => {
        this.fail(e);
      });
  }

  /**
   * Where a element can do any async set up, when this function
   * returns or raises a Error the element has this.ready set to true.
   */
  async init() {}

  /**
   * Function to call when initilisation has failed.
   */
  fail(context: any) {
    this.err = true;
    this.errContext = context;
  }

  /**
   * What to render when the element is loading.
   */
  loading(): TemplateResult {
    return html`
      ${nothing}
    `;
  }

  /**
   * What to render when the element is ready.
   */
  template(): TemplateResult {
    return html`
      ${nothing}
    `;
  }

  /**
   * What to render when the element has failed to load.
   */
  error(context: any): TemplateResult {
    return html`
      ${nothing}
    `;
  }

  render() {
    if (!this.ready) return this.loading();
    if (this.err) return this.error(this.errContext);
    return this.template();
  }
}
