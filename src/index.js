/**
 * Lazily loads assets based on intersection observer.
 *
 * @param {string} [selector='lazy'] - Selector for lazy load elements.
 * @param {object} [observerOptions={
 *   root: null,
 *   threshold: 1,
 *   rootMargin: '300px 0px',
 * }] - Options for the intersection observer.
 */
const lazyLoad = (
  selector = 'lazy',
  observerOptions = {
    root: null,
    threshold: 1,
    rootMargin: '300px 0px',
  }
) => {
  /**
   * Options for lazy loading.
   *
   * @type {object}
   *
   * @property {string} tag - Attribute name for lazy load elements.
   * @property {string} backgroundImage - Attribute name for lazy load elements with background image.
   * @property {string} loaded - Class name to add when the asset is loaded.
   */
  const options = {
    tag: selector,
    backgroundImage: `${selector}-bg`,
    loaded: '-loaded',
  };

  /**
   * Loads the asset for the given element.
   *
   * @param {HTMLElement} element - The element to load the asset for.
   */
  const loadAsset = (element) => {
    const assetPath = element.getAttribute(options.tag);

    if (!assetPath) return;

    if (element.hasAttribute(options.backgroundImage)) {
      element.style.backgroundImage = `url(${assetPath})`;
      element.removeAttribute(options.backgroundImage);
    } else {
      element.setAttribute('src', assetPath);
    }

    element.classList.add(options.loaded);
    element.removeAttribute(options.tag);
  };

  /**
   * Handles the intersection of lazy load elements.
   *
   * @param {IntersectionObserverEntry[]} entries - The entries for the intersection observer.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      loadAsset(entry.target);
      observer.unobserve(entry.target);
    });
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  /**
   * Select 'selector' which is not empty.
   * `[selector]:not([selector=''])`
   */
  const lazyLoadItems = document.querySelectorAll(
    `[${options.tag}]:not([${options.tag}=''])`
  );

  lazyLoadItems.forEach((item) => observer.observe(item));
};