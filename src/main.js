/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultSettings from './defaultSettings.js';
import loadAsset from './assetLoader.js';
import observer from './observer.js';
import { getElements } from './getElements.js';

const lazyLoad = (selector, customSettings = {}) => {
  const settings = { ...defaultSettings, ...customSettings };
  const lazyItems = getElements(selector);

  if (!lazyItems.length) return console.warn('No lazy loadable element found!');

  const observerCallback = (target) => {
    try {
      settings.onLoading(target);
      loadAsset(target, settings);
    } catch (error) {
      settings.onError(target, error.message);
    }
  };

  lazyItems.forEach((item) =>
    observer(item, observerCallback, settings.observer)
  );
};

export default lazyLoad;
