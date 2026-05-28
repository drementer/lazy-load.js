export default {
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
    state: 'lazy-state',
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
};
