/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultSettings from './settings.js';
import loadAsset from './assetLoader.js';
import observer from './observer.js';
import { getElements } from './helpers.js';

/**
 * Lazy load assets.
 *
 * @param {Object} [customSettings={}] - Additional options for configuring the lazy loading behavior.
 */
const lazyLoad = (selector, customSettings = {}) => {
  /**
   * Settings object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */
  const settings = { ...defaultSettings, ...customSettings };

  /**
   * NodeList of lazy loadable elements.
   *
   * @type {NodeList | Array}
   */
  const lazyItems = getElements(selector);

  if (!lazyItems.length) return console.warn('No lazy loadable element found!');

  try {
    lazyItems.forEach((item) =>
      observer(item, settings.observer, loadAsset(target, settings))
    );
  } catch (error) {
    settings.onError(target, error.message);
  }
};

export default lazyLoad;
