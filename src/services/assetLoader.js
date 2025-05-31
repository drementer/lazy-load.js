export default (element, options) => {
  const attributes = Object.entries(options.attrs);

  const loadAttr = ([attr, lazyAttr]) => {
    const assetPath = element.getAttribute(lazyAttr);
    if (assetPath) element.setAttribute(attr, assetPath);
  };

  attributes.forEach(loadAttr);
};
