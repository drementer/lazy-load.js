/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultOptions from './utils/defaultOptions.js';
import loadAsset from './helpers/assetLoader.js';
import states from './helpers/states.js';
import checkSupport from './helpers/checkSupport.js';
import observer from './helpers/observer.js';
import getElements from './helpers/getElements.js';

export default (selector, customOptions = {}) => {
  const options = { ...defaultOptions, ...customOptions };

  const observerCallback = (target) => {
    states.loading(target, options);
    loadAsset(target, options);
  };

  const processLazyItem = (item) => {
    try {
      states.waiting(item, options);

      checkSupport(item);
      observer(item, observerCallback, options.observer);
    } catch (error) {
      states.error(item, options, error.message);
    }
  };

  try {
    const lazyItems = getElements(selector);
    if (!lazyItems.length) throw new Error('No lazy loadable element found!');

    lazyItems.forEach(processLazyItem);
  } catch (error) {
    console.error('Lazy error:', error.message);
  }
};
