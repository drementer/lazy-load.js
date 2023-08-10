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

  /**
   * Handles the intersection of lazy load elements.
   *
   * @private
   *
   * @param {IntersectionObserverEntry[]} entries - The entries for the intersection observer.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const { target } = entry;

      try {
        loadAsset(target, options);
        options.onLoaded(target);
      } catch (error) {
        options.onError(target, error);
      } finally {
        observer.unobserve(target); // bunun tam testini yapmak lazim
      }
    });
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
  const lazyLoadItems = document.querySelectorAll(options.selector);

  lazyLoadItems.forEach((item) => observer.observe(item));
};

export default lazyLoad;
