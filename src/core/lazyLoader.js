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

  #setState(target, state) {
    target.setAttribute(this.#options.attrs.state, state);
  }

  #isAlreadyLoaded(target) {
    const tag = target.tagName?.toLowerCase();

    if (tag === 'img') {
      return target.complete && target.naturalWidth > 0;
    }

    if (tag === 'video') {
      return target.readyState >= 2;
    }

    return false;
  }

  #processItem(item) {
    try {
      checkSupport(item);
      this.#setState(item, 'waiting');
      this.emit('waiting', item);
      observer(item, this.#handleLoading.bind(this), this.#options.observer);
    } catch (error) {
      this.#setState(item, 'error');
      this.emit('error', item, error.message);
      console.warn('Lazy-load error:', item, error);
    }
  }

  #handleLoading(target) {
    this.#setState(target, 'loading');
    this.emit('loading', target);

    let settled = false;

    const onLoad = () => {
      if (settled) return;
      settled = true;
      this.#setState(target, 'loaded');
      this.emit('loaded', target);
    };

    const onError = () => {
      if (settled) return;
      settled = true;
      this.#setState(target, 'error');
      this.emit('error', target, 'Loading media failed');
      console.warn('Lazy-load error:', target);
    };

    target.addEventListener('load', onLoad, { once: true });
    target.addEventListener('error', onError, { once: true });

    try {
      assetLoader(target, this.#options);

      if (this.#isAlreadyLoaded(target)) {
        onLoad();
      }
    } catch (error) {
      this.#setState(target, 'error');
      this.emit('error', target, error.message);
      console.warn('Lazy-load error:', target, error);
    }
  }

  #init() {
    const lazyItems = getElements(this.#selector);
    lazyItems.forEach((item) => this.#processItem(item));
    return this;
  }
}
