export default (element, options) => {
  const assets = {
    src: element.getAttribute(options.attrs.src),
    srcset: element.getAttribute(options.attrs.srcset),
    poster: element.getAttribute(options.attrs.poster),
  };

  if (assets.src) element.setAttribute('src', assets.src);
  if (assets.srcset) element.setAttribute('srcset', assets.srcset);
  if (assets.poster) element.setAttribute('poster', assets.poster);
};
