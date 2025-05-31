import defaultOptions from '../config/defaultOptions.js';
import EventEmitter from './eventEmitter.js';
import assetLoader from '../services/assetLoader.js';
import checkSupport from '../utils/checkSupport.js';
import observer from '../utils/observer.js';
import getElements from '../utils/getElements.js';

export default class extends EventEmitter {
  #selector;
  #options;

  constructor(selector, customOptions) {
    super();
    this.#selector = selector;
    this.#options = { ...defaultOptions, ...customOptions };

    this.#init();
  }

  #clearAttributes(target) {
    const assetAttr = Object.entries(this.#options.attrs);
    assetAttr.forEach(([attr, lazyAttr]) => target.removeAttribute(lazyAttr));
  }

  #processItem(item) {
    try {
      checkSupport(item);
      this.emit('waiting', item);
      observer(item, this.#handleLoading, this.#options.observer);
    } catch (error) {
      console.warn('Lazy-load error:', item);
    }
  }

  #handleLoading(target) {
    this.emit('loading', target);
    assetLoader(target, this.#options);

    target.addEventListener(
      'load',
      () => {
        this.#clearAttributes(target);
        this.emit('loaded', target);
      },
      { once: true }
    );
    target.addEventListener(
      'error',
      () => {
        this.emit('error', target, 'Loading media failed');
        console.warn('Lazy-load error:', target);
      },
      { once: true }
    );
  }

  #init() {
    const lazyItems = getElements(this.#selector);
    lazyItems.forEach((item) => this.#processItem(item));
    return this;
  }
}
