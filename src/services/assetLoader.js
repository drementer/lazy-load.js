export default (element, options) => {
  const { attrs } = options;
  const elementType = element.tagName.toLowerCase();

  const loaders = {
    img: loadImage,
    video: loadVideo,
    iframe: loadIframe,
    default: loadDefault,
  };

  const loadAttribute = (element, attr, lazyAttr) => {
    const value = element.getAttribute(lazyAttr);

    if (!value) return;
    element.setAttribute(attr, value);
    element.removeAttribute(lazyAttr);
  };

  const loadImage = () => {
    loadAttribute(element, 'src', attrs.src);
    loadAttribute(element, 'srcset', attrs.srcset);
  };

  const loadVideo = () => {
    loadAttribute(element, 'src', attrs.src);
    loadAttribute(element, 'poster', attrs.poster);
  };

  const loadIframe = () => {
    loadAttribute(element, 'src', attrs.src);
  };

  const loadDefault = () => {
    Object.entries(attrs).forEach(([attr, lazyAttr]) => {
      loadAttribute(element, attr, lazyAttr);
    });
  };

  const loadMedia = () => {
    const loader = loaders[elementType] || loaders.default;
    return loader();
  };

  try {
    loadMedia();
  } catch (error) {
    console.warn('Failed to load media:', error);
    throw error;
  }
};
