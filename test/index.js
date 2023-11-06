import lazyLoad from '/dist/lazy-load.js';

const lazyLoadItems = document.querySelectorAll('[lazy]');

lazyLoad(lazyLoadItems, {
  onLoaded: (element) => console.log(element),
});
