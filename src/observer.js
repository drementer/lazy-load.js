/**
 * Creates an IntersectionObserver for a given item and triggers a callback when the item is intersecting.
 *
 * @param {HTMLElement} item - The HTML element to observe.
 * @param {Object} settings - The settings for the IntersectionObserver.
 * @param {Function} callback - The callback function to execute when the item is intersecting.
 */
const observer = (item, settings, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      callback(entry.target);
      observer.unobserve(entry.target);
    });
  }, settings);

  observer.observe(item);
};

export default observer;
