const supportedElements = ['img', 'picture', 'video', 'embed', 'object'];

const loadAssets = (element, assets) => {
  if (assets.src) element.setAttribute('src', assets.src);
  if (assets.srcset) element.setAttribute('srcset', assets.srcset);
  if (assets.poster) element.setAttribute('poster', assets.poster);
};

const elementLoaded = (element, options) => {
  element.classList.add(options.modifiers.loaded);
  element.classList.remove(options.modifiers.loading);

  element.removeAttribute(options.attrs.src);
  element.removeAttribute(options.attrs.srcset);
  element.removeAttribute(options.attrs.poster);

  options.onLoaded(element);
};

export default (element, options) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = supportedElements.includes(elementType);

  if (!isSupported) throw new Error(`Element type ${elementType} is not supported!`);

  const handleLoadEvent = () => elementLoaded(element, options);
  const assets = {
    src: element.getAttribute(options.attrs.src),
    srcset: element.getAttribute(options.attrs.srcset),
    poster: element.getAttribute(options.attrs.poster),
  };

  loadAssets(element, assets);

  element.classList.add(options.modifiers.loading);
  element.addEventListener('load', handleLoadEvent, { once: true });
};
