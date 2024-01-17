/**
 * Object managing different states.
 *
 * @property {function} loading - Function handling loading state operations.
 * @property {function} loaded - Function handling loaded state operations.
 * @property {function} error - Function handling error state operations.
 */
const states = {
  loading: (element, options) => {
    const handleLoad = () => states.loaded(element, options);
    element.classList.add(options.modifiers.loading);
    element.addEventListener('load', handleLoad, { once: true });
    options.onLoading(element);
  },

  loaded: (element, options) => {
    element.classList.remove(options.modifiers.loading);
    element.classList.add(options.modifiers.loaded);
    element.removeAttribute(options.attrs.src);
    element.removeAttribute(options.attrs.srcset);
    element.removeAttribute(options.attrs.poster);
    options.onLoaded(element);
  },

  error: (element, options, error) => {
    element.classList.remove(options.modifiers.loading);
    options.onError(element, error);
  },
};

export default states;
