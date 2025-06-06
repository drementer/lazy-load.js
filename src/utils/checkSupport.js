const supportedElements = [
  'img',
  'video',
  'embed',
  'object',
  'iframe',
  'audio',
];

export default (element) => {
  const elementType = element.tagName;
  const isSupported = supportedElements.includes(elementType.toLowerCase());

  if (!isSupported) throw new Error(`${elementType} Element is not supported!`);
  return true;
};
