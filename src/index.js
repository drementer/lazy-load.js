/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.6
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultSettings from './settings.js';
import loadAsset from './assetLoader.js';

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
   * Handles the intersection of lazy load elements.
   *
   * @private
   *
   * @param {IntersectionObserverEntry[]} entries - The entries for the intersection observer.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  const handleIntersection = (entries, observer) => {
    const handler = (entry) => {
      const { target, isIntersecting } = entry;
      if (!isIntersecting) return;

      try {
        loadAsset(target, settings);
      } catch (error) {
        settings.onError(target, error);
      } finally {
        observer.unobserve(target); // bunun tam testini yapmak lazim
      }
    };

    entries.forEach(handler);
  };

  /**
   * IntersectionObserver used for lazy loading.
   *
   * @type {IntersectionObserver}
   */
  const observer = new IntersectionObserver(
    handleIntersection,
    settings.observer
  );

  /**
   * NodeList of lazy loadable elements.
   *
   * @type {NodeList}
   */
  const lazyLoadItems = document.querySelectorAll(settings.selector);


  if (!lazyLoadItems.length) {
    console.warn('🚀 No lazy loadable element found.');
    return;
  }

  lazyLoadItems.forEach((item) => observer.observe(item));
};

export default lazyLoad;
