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

const loadBackground = (element, src) => {
  element.style.background = `url(${src})`;
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
 * Loads the asset for the given element based on its type (img, picture, video).
 *
 * @private
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */
const loadAsset = (element, options) => {
  const { tag, altAttr } = options;

  const assetLoaders = {
    img: loadImage,
    picture: loadPicture,
    video: loadVideo,
  };

  const elementType = element.tagName.toLowerCase();
  const assetLoader = assetLoaders[elementType];

  const assetPath = element.getAttribute(tag);
  const assetAltValue = element.getAttribute(altAttr);

  assetLoader(element, assetPath, assetAltValue);
};

export default loadAsset;
