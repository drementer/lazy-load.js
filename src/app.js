import defaultOptions from './utils/defaultOptions.js';
import loadAsset from './helpers/assetLoader.js';
import states from './helpers/states.js';
import checkSupport from './helpers/checkSupport.js';
import observer from './helpers/observer.js';
import getElements from './helpers/getElements.js';

export default (selector = '[lazy]', customOptions = {}) => {
  const options = { ...defaultOptions, ...customOptions };

  const handleLoading = (target) => {
    const handleLoad = () => {
      states.setLoaded(target, options);
    };

    const handleError = () => {
      states.setError(target, options, 'Loading media.');
    };

    states.setLoading(target, options);
    loadAsset(target, options);

    target.addEventListener('load', handleLoad, { once: true });
    target.addEventListener('error', handleError, { once: true });
  };

  const processLazyItem = (item) => {
    try {
      checkSupport(item);
      states.setWaiting(item, options);
      observer(item, handleLoading, options.observer);
    } catch (error) {
      states.setError(item, options, error.message);
    }
  };

  const lazyItems = getElements(selector);
  lazyItems.forEach(processLazyItem);
};
