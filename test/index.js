import lazyLoad from '/src/index.js';

lazyLoad({
  onLoaded: (element) => {
    console.log(element);
  },
});
