/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} element - The image element to load the asset for.
 * @param {string} src - The asset path attribute value.
 */
const loadImage = (element, src) => {
  element.src = src;
};

/**
 * Loads the asset for the given picture element.
 *
 * @private
 *
 * @param {HTMLPictureElement} element - The picture element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 */
const loadPicture = (element, src) => {
  let img = element.querySelector('img');

  if (!img) {
    img = document.createElement('img');
    element.append(img);
  }

  loadImage(img, src);
};

/**
 * Loads the asset for the given video element.
 *
 * @private
 *
 * @param {HTMLVideoElement} element - The video element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 */
const loadVideo = (element, src) => {
  element.src = src;
};

/**
 * A map of asset loaders by element type.
 *
 * @private
 *
 * @type {Object}
 * @property {function} img - To load an image.
 * @property {function} picture - To load a picture.
 * @property {function} video - To load a video.
 */
const assetLoaders = {
  img: loadImage,
  picture: loadPicture,
  video: loadVideo,
};

/**
 * Loads the asset for the given element based on its type (img, picture, video).
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */
const loadAsset = (element, settings) => {
  const handleLoadEvent = () => {
    element.classList.remove(settings.modifiers.loading);
    element.removeAttribute(settings.tag);
    element.classList.add(settings.modifiers.loaded);
    settings.onLoaded(element);

    element.removeEventListener('load', handleLoadEvent);
  };

  const assetPath = element.getAttribute(settings.tag);
  const elementType = element.tagName.toLowerCase();
  const assetLoader = assetLoaders[elementType];

	if (!assetLoader) throw new Error(`Element type '${elementType}' is not supported!`);

  assetLoader(element, assetPath);
  element.classList.add(settings.modifiers.loading);
  element.addEventListener('load', handleLoadEvent);
};

export default loadAsset;
