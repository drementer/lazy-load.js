export default {
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
};
