import {
  LitElement,
  property,
  TemplateResult,
  html,
} from 'lit-element';

export class AsyncElement extends LitElement {
  @property() ready: boolean = false;
  @property() err: boolean = false;
  @property() errContext: any = null;

  connectedCallback() {
    super.connectedCallback();
    // Being called again on a reconnect.
    if (this.ready) {
      return;
    }

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
    this.ready = true;
    this.err = true;
    this.errContext = context;
  }

  /**
   * What to render when the element is loading.
   */
  loading(): TemplateResult {
    return html`
      DEFAULT LOADING ELEMENT
    `;
  }

  /**
   * What to render when the element is ready.
   */
  template(): TemplateResult {
    return html`
      DEFAULT ELEMENT
    `;
  }

  /**
   * What to render when the element has failed to load.
   */
  error(context: any): TemplateResult {
    return html`
      DEFAULT ERROR MESSAGE: ${context}
    `;
  }

  /**
   * Register a promise which will block the component until resolved.
   * Useful for pages which do server calls.
   */
  waitOn(p: Promise<any>) {
    this.ready = false;
    p.then(() => {
      this.ready = true;
    }).catch(e => {
      this.fail(e);
    });
  }

  render() {
    if (!this.ready) return this.loading();
    if (this.err) return this.error(this.errContext);
    return this.template();
  }
}
