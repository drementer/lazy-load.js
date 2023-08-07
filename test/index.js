import lazyLoad from '/src/index.js';

lazyLoad({
  tag: '[lazy]',
  onLoaded: (element) => {
    console.log(element);
  },
});
