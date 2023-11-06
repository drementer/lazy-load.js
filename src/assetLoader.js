const regularLoad = (element, assets) => {
  element.src = assets.src;
};

const loadImage = (element, assets) => {
  element.src = assets.src;
  if (assets.srcset) element.srcset = assets.srcset;
};

const loadVideo = (element, assets) => {
  element.src = assets.src;

  if (assets.poster) element.poster = assets.poster;
};

const loadPicture = (element, assets) => {
  let img = element.querySelector('img');

  if (!img) {
    img = document.createElement('img');
    element.appendChild(img);
  }

  loadImage(img, assets);
};

const assetLoaders = {
  img: loadImage,
  picture: loadPicture,
  video: loadVideo,
  iframe: regularLoad,
  embed: regularLoad,
  object: regularLoad,
};

const loadAsset = (element, settings) => {
  const elementType = element.tagName.toLowerCase();
  const assetLoader = assetLoaders[elementType];

  if (!assetLoader) {
    throw new Error(`Element type '${elementType}' is not supported!`);
  }

  const assets = {
    src: element.getAttribute(settings.attrs.src),
    srcset: element.getAttribute(settings.attrs.srcset),
    poster: element.getAttribute(settings.attrs.poster),
  };

  const handleLoadEvent = () => {
    element.classList.remove(settings.modifiers.loading);
    element.classList.add(settings.modifiers.loaded);

    element.removeAttribute(settings.attrs.src);
    element.removeAttribute(settings.attrs.srcset);
    element.removeAttribute(settings.attrs.poster);

    settings.onLoaded(element);
  };

  assetLoader(element, assets);

  element.classList.add(settings.modifiers.loading);
  element.addEventListener('load', handleLoadEvent, { once: true });
};

export default loadAsset;
