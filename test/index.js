import lazyLoad from '/dist/lazy-load.js';

lazyLoad({
  onLoaded: (element) => console.log(element),
});
