const supportedElements = [
  'img',
  'picture',
  'video',
  'embed',
  'object',
];

const getAssets = (element, settings) => {
  const assets = {};

  Object.entries(settings.attrs).forEach(([key, value]) => {
    assets[key] = element.getAttribute(value);
  });

  return assets;
};

const loadAssets = (element, assets) => {
  Object.entries(assets).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
};

const elementLoaded = (element, settings) => {
  element.classList.add(settings.modifiers.loaded);
  element.classList.remove(settings.modifiers.loading);

  Object.entries(settings.attrs).forEach(([key, value]) => {
    element.removeAttribute(value);
  });

  settings.onLoaded(element);
};

export default (element, settings) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = supportedElements.includes(elementType);

  if (!isSupported) return console.log('Element not supported!', element);

  const assets = getAssets(element, settings);
  const handleLoadEvent = () => elementLoaded(element, settings);

  loadAssets(element, assets);

  element.classList.add(settings.modifiers.loading);
  element.addEventListener('load', handleLoadEvent, { once: true });
};
