import lazyLoad from '../src/index.js';

const createImage = (overrides = {}) => {
  const listeners = new Map();

  return {
    tagName: 'IMG',
    attributes: new Map(),
    complete: false,
    naturalWidth: 0,
    getAttribute(name) {
      return this.attributes.has(name) ? this.attributes.get(name) : null;
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);

      if (name === 'src') {
        this.complete = true;
        this.naturalWidth = 100;
        const handlers = listeners.get('load') || [];
        handlers.forEach((fn) => fn());
      }
    },
    removeAttribute(name) {
      this.attributes.delete(name);
    },
    addEventListener(type, handler, options) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(handler);

      if (options?.once) {
        const original = handler;
        const wrapped = (...args) => {
          listeners.set(
            type,
            (listeners.get(type) || []).filter((fn) => fn !== wrapped)
          );
          original(...args);
        };
        listeners.get(type).pop();
        listeners.get(type).push(wrapped);
      }
    },
    ...overrides,
  };
};

describe('LazyLoader', () => {
  let observedCallback;
  let originalIntersectionObserver;
  let originalDocument;

  beforeEach(() => {
    observedCallback = null;

    originalIntersectionObserver = globalThis.IntersectionObserver;
    originalDocument = globalThis.document;

    globalThis.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(target) {
        observedCallback = () => {
          this.callback(
            [{ isIntersecting: true, target }],
            { unobserve: () => {} }
          );
        };
      }
      unobserve() {}
    };

    globalThis.document = {
      querySelectorAll: () => [createImage()],
    };
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
    globalThis.document = originalDocument;
  });

  const options = {
    attrs: { src: 'lazy', srcset: 'lazy-srcset', poster: 'lazy-poster' },
  };

  it('sets lazy-state to waiting then loading and loaded', () => {
    const img = createImage();
    img.setAttribute('lazy', 'image.jpg');
    globalThis.document.querySelectorAll = () => [img];

    const loader = lazyLoad('[lazy]', options);

    expect(img.getAttribute('lazy-state')).toBe('waiting');

    observedCallback();

    expect(img.getAttribute('lazy-state')).toBe('loaded');
    expect(img.getAttribute('src')).toBe('image.jpg');
    expect(loader).toBeDefined();
  });

  it('emits loaded for cached images when load fires synchronously', () => {
    const img = createImage();
    img.setAttribute('lazy', 'cached.jpg');
    globalThis.document.querySelectorAll = () => [img];

    let loadedCount = 0;
    lazyLoad('[lazy]', options).on('loaded', () => loadedCount++);

    observedCallback();

    expect(loadedCount).toBe(1);
    expect(img.getAttribute('lazy-state')).toBe('loaded');
  });

  it('emits error for unsupported elements', () => {
    const span = createImage({ tagName: 'SPAN' });
    globalThis.document.querySelectorAll = () => [span];

    lazyLoad('[lazy]', options);

    expect(span.getAttribute('lazy-state')).toBe('error');
  });
});
