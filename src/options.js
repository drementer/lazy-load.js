/**
 * Default options for lazy loading behavior.
 *
 * @type {Object}
 *
 * @param {string} [tag=selector] - The CSS selector for lazy loadable elements.
 * @param {string} [toggleClass="-loaded"] - The class name to toggle on elements after loading.
 * @param {Function} [onLoaded] - Callback function to execute when an element is successfully loaded.
 * @param {Function} [onError] - Callback function to execute when an error occurs during loading.
 * @param {Object} [observer={ root: null, threshold: 1, rootMargin: '300px 0px' }] - Configuration for IntersectionObserver used for lazy loading.
 */
const options = {
  tag: 'lazy',
  selector: '[lazy]',
  toggleClass: '-loaded',
  onLoaded: () => {},
  onError: (element, error) => {
    console.error('🚀 Error on ~ element, error:', element, error);
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px', // Burayı daha detalı araştırmam gerek
  },
};

export default options;
