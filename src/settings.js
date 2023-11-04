/**
 * Default settings for lazy loading behavior.
 *
 * @type {Object}
 *
 * @property {Function} selector - Get the CSS selector for lazy loadable elements.
 * @property {Function} altAttribute - Get the alternative attribute for lazy loadable elements.
 * @property {string} [tag] - The CSS selector for lazy loadable elements.
 * @property {Object} modifiers - The class names to toggle on elements.
 * @property {string} modifiers.loaded - The class name to toggle on elements after loading.
 * @property {string} modifiers.loading - The class name to toggle on elements while loading.
 * @property {Function} [onLoaded] - Callback function to execute when an element is successfully loaded.
 * @property {Function} [onError] - Callback function to execute when an error occurs during loading.
 * @property {Object} [observer={ root: null, threshold: 1, rootMargin: '300px 0px' }] - Configuration for IntersectionObserver used for lazy loading.
 */
const settings = {
  get selector() {
    return `[${this.tag}]`;
  },

  get altAttribute() {
    return `${this.tag}-alt`;
  },

  tag: null,
  modifiers: {
    loaded: '-loaded',
    loading: '-loading',
  },
  onLoaded: (element) => {},
  onError: (element, error) => {
    console.warn('Error on ~ element, error:', element, error);
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
};

export default settings;
