/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.6
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultOptions from './options.js';
import loadAsset from './assetLoader.js';

/**
 * Lazy load assets.
 *
 * @param {string} [selector="[lazy]"] - The CSS selector for lazy loadable elements.
 * @param {Object} [settings={}] - Additional options for configuring the lazy loading behavior.
 */
const lazyLoad = (settings = {}) => {
  /**
   * Options object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */
  const options = { ...defaultOptions, ...settings };
  const { onLoaded, onError, selector } = options;

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
        loadAsset(target, options);
        onLoaded(target);
      } catch (error) {
        onError(target, error);
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
    options.observer
  );

  /**
   * NodeList of lazy loadable elements.
   *
   * @type {NodeList}
   */
  const lazyLoadItems = document.querySelectorAll(selector);

  lazyLoadItems.forEach((item) => observer.observe(item));
};

export default lazyLoad;
