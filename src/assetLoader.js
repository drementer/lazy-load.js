/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} element - The image element to load the asset for.
 * @param {string} src - The asset path attribute value.
 * @param {string} alt - The asset alt attribute value.
 */
const loadImage = (element, src, alt) => {
  element.src = src;
  element.alt = alt;
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
  const { tag } = options;

  const loadFunctions = {
    img: loadImage,
    picture: loadPicture,
    video: loadVideo,
  };

  const elementType = element.tagName.toLowerCase();
  const loadFunction = loadFunctions[elementType];

  const assetAttr = element.getAttribute(`${tag}-src`);
  const assetAlt = element.getAttribute(`${tag}-alt`) || '';
  const backgroundAttr = element.getAttribute(`${tag}-background`);

  if (backgroundAttr) return loadBackground(element, backgroundAttr);
  if (loadFunction) return loadFunction(element, assetAttr, assetAlt);

  throw new Error(`Invalid element type: ${elementType}`);
};

export default loadAsset;
