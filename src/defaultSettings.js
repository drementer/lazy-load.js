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
  onLoaded: () => {},
  onLoading: () => {},
  onError: (element, error) => console.error('Error on:', element, error),
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
};
