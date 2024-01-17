/**
 * @type {Array}
 * List of supported HTML element types.
 */
const supportedElements = ['img', 'picture', 'video', 'embed', 'object'];

/**
 * Checks if the given HTML element is of a supported type.
 *
 * @param {HTMLElement} element - The HTML element to be checked.
 * @throws {Error} Throws an error if the element type is not supported.
 * @returns {boolean} Returns true if the element type is supported.
 */
export default (element) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = supportedElements.includes(elementType);

  if (isSupported) return true;

  throw new Error(`Element type ${elementType} is not supported!`);
};
