const resetAssets = (element, options) => {
  element.removeAttribute(options.attrs.src);
  element.removeAttribute(options.attrs.srcset);
  element.removeAttribute(options.attrs.poster);
};

const states = {
  loading: (element, options) => {
    const handleLoad = () => states.loaded(element, options);
    element.classList.add(options.modifiers.loading);
    element.addEventListener('load', handleLoad, { once: true });
  },
  loaded: (element, options) => {
    element.classList.remove(options.modifiers.loading);
    element.classList.add(options.modifiers.loaded);

    resetAssets(element, options);
    options.onLoaded(element);
  },
  error: (element, options, error) => {
    element.classList.remove(options.modifiers.loading);
    options.onError(element, error);
  },
};

export default states;
