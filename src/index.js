/**
 * Lazy loads assets for elements with lazy attributes (e.g., lazy-src, lazy-alt).
 *
 * @param {string} [selector="[lazy]"] - The CSS selector for lazy loadable elements.
 * @param {Object} [options={}] - Additional options for configuring the lazy loading behavior.
 */
const lazyLoad = (selector = '[lazy]', options = {}) => {
  /**
   * Default options for lazy loading behavior.
   *
   * @type {Object}
   *
   * @param {string} [otag=selector] - The CSS selector for lazy loadable elements.
   * @param {string} [toggleClass="-loaded"] - The class name to toggle on elements after loading.
   * @param {Function} [onLoaded=(element)=>{}] - Callback function to execute when an element is successfully loaded.
   * @param {Function} [onError=(element, error)=>{}] - Callback function to execute when an error occurs during loading.
   * @param {Object} [observer={ root: null, threshold: 1, rootMargin: '300px 0px' }] - Configuration for IntersectionObserver used for lazy loading.
   */
  const defaultOptions = {
    tag: selector,
    toggleClass: '-loaded',
    onLoaded: () => {},
    onError: (element, error) => {
      console.log('🚀 Error on ~ element, error:', element, error);
    },
    observer: {
      root: null,
      threshold: 1,
      rootMargin: '300px 0px',
    },
  };

  /**
   * Options object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */
  options = { ...defaultOptions, ...options };

  /**
   * Loads the asset for the given image element.
   *
   * @private
   *
   * @param {HTMLImageElement} img - The image element to load the asset for.
   * @param {string} assetAttr - The asset URL attribute value.
   * @param {string} assetAlt - The asset alt attribute value.
   */
  const loadImage = (img, assetAttr, assetAlt) => {
    img.src = assetAttr;
    img.alt = assetAlt;
  };

  /**
   * Loads the asset for the given picture element.
   *
   * @private
   *
   * @param {HTMLPictureElement} element - The picture element to load the asset for.
   * @param {string} assetAttr - The asset URL attribute value.
   * @param {string} assetAlt - The asset alt attribute value.
   */
  const loadPicture = (element, assetAttr, assetAlt) => {
    let img = element.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      element.append(img);
    }
    loadImage(img, assetAttr, assetAlt);
  };

  /**
   * Loads the asset for the given video element.
   *
   * @private
   *
   * @param {HTMLVideoElement} element - The video element to load the asset for.
   * @param {string} assetAttr - The asset URL attribute value.
   */
  const loadVideo = (element, assetAttr) => {
    element.src = assetAttr;
  };

  /**
   * Loads the asset for the given element based on its type (img, picture, video).
   *
   * @private
   *
   * @param {HTMLElement} element - The element to load the asset for.
   */
  const loadAsset = (element) => {
    const elementType = element.tagName.toLowerCase();

    const isImage = elementType === 'img';
    const isPicture = elementType === 'picture';
    const isVideo = elementType === 'video';

    const assetAttr = element.getAttribute(`lazy-src`);
    const assetAlt = element.getAttribute(`lazy-alt`) || '';
    const backgroundAttr = element.getAttribute(`lazy-background`);

    if (isImage) return loadImage(element, assetAttr, assetAlt);
    if (isPicture) return loadPicture(element, assetAttr, assetAlt);
    if (isVideo) return loadVideo(element, assetAttr);

    element.src = assetAttr;
  };

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

      try {
        loadAsset(entry.target);
        options.onLoaded(entry);
      } catch (error) {
        options.onError(entry, error);
      } finally {
        observer.unobserve(entry.target);
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
  const lazyLoadItems = document.querySelectorAll(options.tag);

  lazyLoadItems.forEach((item) => observer.observe(item));
};
