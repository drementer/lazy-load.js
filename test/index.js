import lazyLoad from '/dist/lazy-load.js';

lazyLoad('lazy', {
  onLoaded: (element) => console.log(element),
});