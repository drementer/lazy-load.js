import LazyLoader from './core/lazyLoader.js';

export default (selector = '[lazy]', customOptions = {}) => {
  return new LazyLoader(selector, customOptions);
};
