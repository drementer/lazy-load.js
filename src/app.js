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
import loadAsset from './assetLoader.js';
import observer from './observer.js';
import getElements from './getElements.js';

export default (selector, customOptions = {}) => {
  const options = { ...defaultOptions, ...customOptions };
  const lazyItems = getElements(selector);

  if (!lazyItems.length) return console.error('No lazy loadable element found!');

  const observerCallback = (target) => {
    try {
      options.onLoading(target);
      loadAsset(target, options);
    } catch (error) {
      options.onError(target, error.message);
    }
  };

  lazyItems.forEach((item) => {
    observer(item, observerCallback, options.observer);
  });
};
