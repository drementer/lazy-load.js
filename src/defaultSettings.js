const defaultSettings = {
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
  },
  modifiers: {
    loaded: '-loaded',
    loading: '-loading',
  },
  onLoaded: () => {},
  onLoading: () => {},
  onError: (element, error) => console.warn('Error on:', element, error),
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
};

export default defaultSettings;
