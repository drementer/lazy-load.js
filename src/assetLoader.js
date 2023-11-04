/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} element - The image element to load the asset for.
 * @param {string} src - The asset path attribute value.
 * @param {string} alt - The asset alt attribute value.
 */
const loadImage = (element, src, alt = null) => {
  element.src = src;
  if (alt) element.alt = alt;
};

/**
 * Loads the asset for the given picture element.
 *
 * @private
 *
 * @param {HTMLPictureElement} element - The picture element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 * @param {string} alt - The asset alt attribute value.
 */
const loadPicture = (element, src, alt) => {
  let img = element.querySelector('img');

  if (!img) {
    img = document.createElement('img');
    element.append(img);
  }

  loadImage(img, src, alt);
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
 * @private
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */
const loadAsset = (element, settings) => {
  const { tag, altAttr } = settings;

  const handleLoadEvent = () => {
    element.classList.remove(settings.modifiers.loading);
    element.removeAttribute(settings.tag);
    element.classList.add(settings.modifiers.loaded);
    settings.onLoaded(element);

    element.removeEventListener('load', handleLoadEvent);
  };

  const assetPath = element.getAttribute(tag);
  const assetAltValue = element.getAttribute(altAttr);

  const elementType = element.tagName.toLowerCase();
  const assetLoader = assetLoaders[elementType];

	if (!assetLoader) throw new Error(`Element type '${elementType}' is not supported!`);

  assetLoader(element, assetPath, assetAltValue);
  element.classList.add(settings.modifiers.loading);
  element.addEventListener('load', handleLoadEvent);
};

export default loadAsset;
