const supportedElements = ['img', 'picture', 'video', 'embed', 'object'];

const loadAssets = (element, assets) => {
  if (assets.src) element.setAttribute('src', assets.src);
  if (assets.srcset) element.setAttribute('srcset', assets.srcset);
  if (assets.poster) element.setAttribute('poster', assets.poster);
};

const elementLoaded = (element, settings) => {
  element.classList.add(settings.modifiers.loaded);
  element.classList.remove(settings.modifiers.loading);

  element.removeAttribute(settings.attrs.src);
  element.removeAttribute(settings.attrs.srcset);
  element.removeAttribute(settings.attrs.poster);

  settings.onLoaded(element);
};

export default (element, settings) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = supportedElements.includes(elementType);

  if (!isSupported) throw new Error(`Element type ${elementType} is not supported!`);

  const handleLoadEvent = () => elementLoaded(element, settings);
  const assets = {
    src: element.getAttribute(settings.attrs.src),
    srcset: element.getAttribute(settings.attrs.srcset),
    poster: element.getAttribute(settings.attrs.poster),
  };

  loadAssets(element, assets);

  element.classList.add(settings.modifiers.loading);
  element.addEventListener('load', handleLoadEvent, { once: true });
};
