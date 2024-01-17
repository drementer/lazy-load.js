/**
 * Default options for the lazy loading functionality.
 *
 * @property {Object} attrs - The attributes to be used for lazy loading.
 * @property {string} attrs.src - The attribute for the source of the media.
 * @property {string} attrs.srcset - The attribute for the source set of the media.
 * @property {string} attrs.poster - The attribute for the poster of the media.
 *
 * @property {Object} modifiers - The modifiers to be used for the states of loading.
 * @property {string} modifiers.loaded - The modifier for the loaded state.
 * @property {string} modifiers.loading - The modifier for the loading state.
 *
 * @property {Object} observer - The options for the Intersection Observer.
 * @property {Element} observer.root - The root element for the Intersection Observer.
 * @property {number} observer.threshold - The threshold for the Intersection Observer.
 * @property {string} observer.rootMargin - The root margin for the Intersection Observer.
 *
 * @property {Function} onLoaded - The callback to be executed when the media is loaded.
 * @property {Function} onLoading - The callback to be executed when the media is loading.
 * @property {Function} onError - The callback to be executed when there is an error loading the media.
 */
export default {
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
  },
  modifiers: {
    loaded: '-loaded',
    loading: '-loading',
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
  onLoaded: () => {},
  onLoading: () => {},
  onError: (element, error) => console.error('Error on:', element, error),
};
