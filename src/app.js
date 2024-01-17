/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultOptions from './defaultOptions.js';
import states from './states.js';
import loadAsset from './assetLoader.js';
import checkSupport from './checkSupport.js';
import observer from './observer.js';
import getElements from './getElements.js';

export default (selector, customOptions = {}) => {
  const options = { ...defaultOptions, ...customOptions };
  const lazyItems = getElements(selector);

  const observerCallback = (target) => {
    states.loading(target, options);
    loadAsset(target, options);
  };

  lazyItems.forEach((item) => {
    try {
      checkSupport(item);
      observer(item, observerCallback, options.observer);
    } catch (error) {
      states.error(item, options, error.message);
    }
  });
};
