/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} img - The image element to load the asset for.
 * @param {string} assetAttr - The asset URL attribute value.
 * @param {string} assetAlt - The asset alt attribute value.
 */
const loadImage = (img, assetAttr, assetAlt) => {
  img.src = assetAttr;
  img.alt = assetAlt;
};

const loadBackground = (element, assetAttr) => {
  element.style.background = `url(${assetAttr})`;
};

/**
 * Loads the asset for the given picture element.
 *
 * @private
 *
 * @param {HTMLPictureElement} element - The picture element to load the asset for.
 * @param {string} assetAttr - The asset URL attribute value.
 * @param {string} assetAlt - The asset alt attribute value.
 */
const loadPicture = (element, assetAttr, assetAlt) => {
  let img = element.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    element.append(img);
  }
  loadImage(img, assetAttr, assetAlt);
};

/**
 * Loads the asset for the given video element.
 *
 * @private
 *
 * @param {HTMLVideoElement} element - The video element to load the asset for.
 * @param {string} assetAttr - The asset URL attribute value.
 */
const loadVideo = (element, assetAttr) => {
  element.src = assetAttr;
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
  const elementType = element.tagName.toLowerCase();

  const isImage = elementType === 'img';
  const isPicture = elementType === 'picture';
  const isVideo = elementType === 'video';

  const assetAttr = element.getAttribute(`${tag}-src`);
  const assetAlt = element.getAttribute(`${tag}-alt`) || '';
  const backgroundAttr = element.getAttribute(`${tag}-background`);

  if (backgroundAttr) return loadBackground(element, backgroundAttr);
  if (isImage) return loadImage(element, assetAttr, assetAlt);
  if (isPicture) return loadPicture(element, assetAttr, assetAlt);
  if (isVideo) return loadVideo(element, assetAttr);

  element.src = assetAttr;
};

export default loadAsset;
