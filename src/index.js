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

/**
 * Lazy load assets.
 *
 * @param {Object} [customSettings={}] - Additional options for configuring the lazy loading behavior.
 */
const lazyLoad = (tag = 'lazy', customSettings = {}) => {
  defaultSettings.tag = tag;

  /**
   * Settings object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */
  const settings = { ...defaultSettings, ...customSettings };

  /**
   * Callback function for the observer. Tries to load the asset and handles any errors.
   *
   * @param {HTMLElement} target - The HTML element to load the asset for.
   */
  const observeCallback = (target) => {
    try {
      loadAsset(target, settings);
    } catch (error) {
      settings.onError(target, error.message);
    }
  };

  /**
   * NodeList of lazy loadable elements.
   *
   * @type {NodeList}
   */
  const lazyLoadItems = document.querySelectorAll(settings.selector);

  if (!lazyLoadItems.length) {
    console.warn('No lazy loadable element found!');
    return;
  }

  lazyLoadItems.forEach((item) =>
    observer(item, settings.observer, observeCallback)
  );
};

export default lazyLoad;
