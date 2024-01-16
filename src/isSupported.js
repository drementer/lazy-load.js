const supportedElements = ['img', 'picture', 'video', 'embed', 'object'];

export default (element) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = supportedElements.includes(elementType);

  if (isSupported) return true;
  throw new Error(`Element type ${elementType} is not supported!`);
};
