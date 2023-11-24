export default (selector, root = document) => {
  if (selector instanceof Element) return [selector];
  if (selector instanceof NodeList) return selector;
  if (selector instanceof Array) return selector;

  return root.querySelectorAll(selector);
};
