/**
 * Set attributes on the given HTML element based on the provided options.
 *
 * @module assetLoader
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} options - Options for attribute names.
 * @param {Object} options.attrs - Attribute names.
 * @param {string} [options.attrs.src] - Attribute name for 'src'.
 * @param {string} [options.attrs.srcset] - Attribute name for 'srcset'.
 * @param {string} [options.attrs.poster] - Attribute name for 'poster'.
 */
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
