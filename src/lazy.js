/**
 * Lazy loads visual content when it approaches
 * the visible area of the screen to increase
 * page loading speed.
 *
 * @param {string} [selector='[lazy]'] - CSS selector for lazy load items.
 * @param {Object} [options] - IntersectionObserver options.
 */
const lazyLoad = (selector = '[lazy]', options = {}) => {
  const lazyLoadItems = document.querySelectorAll(selector);

  const defaultOptions = {
    root: null,
    threshold: 1,
    rootMargin: '300px 0px',
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const value = target.getAttribute('lazy');

      target.classList.add('-loaded');
      target.removeAttribute('lazy');
      target.setAttribute('src', value);

      observer.unobserve(target);
    });
  }, mergedOptions);

  lazyLoadItems.forEach((item) => observer.observe(item));
};
