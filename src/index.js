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
const lazyLoad = (selector = 'lazy', customSettings = {}) => {
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

  /**
   * Callback function for the observer. Tries to load the asset and handles any errors.
   *
   * @param {HTMLElement} target - The HTML element to load the asset for.
   */
  const observerCallback = (target) => {
    try {
      loadAsset(target, settings);
    } catch (error) {
      settings.onError(target, error.message);
    }
  };

  if (!lazyItems.length) return console.warn('No lazy loadable element found!');

  lazyItems.forEach((item) =>
    observer(item, settings.observer, observerCallback)
  );
};

export default lazyLoad;
