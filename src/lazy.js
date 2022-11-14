/*!
 * Loads visual content when it approaches
 * the visible area of ​​the screen to
 * increase page loading speed.
 *
 * @author drementer
 * @version 1.0.4
 * @license MIT
 * @link https://github.com/drementer/lazy-load.js
 */

const lazyLoadItems = document.querySelectorAll('[lazy]');

const lazyLoad = (item) => {
  const ioSettings = {
    root: null,
    threshold: 1,
    rootMargin: '300px 0px',
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      let target = entry.target;
      let value = target.getAttribute('lazy');

      target.classList.add('-loaded');
      target.removeAttribute('lazy');
      target.setAttribute('src', value);

      observer.disconnect();
    });
  }, ioSettings);

  io.observe(item);
};

const initLazyLoad = () => {
  lazyLoadItems.forEach((item) => {
    lazyLoad(item);
  });
};

window.onload = initLazyLoad();