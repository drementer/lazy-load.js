export default (selector) => {
  if (selector instanceof Element) return [selector];
  if (selector instanceof NodeList) return selector;
  if (Array.isArray(selector)) return selector;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) throw new Error('No lazy loadable element found!');
  return elements;
};
