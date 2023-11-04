/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.6
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ /**
 * Default options for lazy loading behavior.
 *
 * @type {Object}
 *
 * @param {string} [tag=selector] - The CSS selector for lazy loadable elements.
 * @param {string} [toggleClass="-loaded"] - The class name to toggle on elements after loading.
 * @param {Function} [onLoaded] - Callback function to execute when an element is successfully loaded.
 * @param {Function} [onError] - Callback function to execute when an error occurs during loading.
 * @param {Object} [observer={ root: null, threshold: 1, rootMargin: '300px 0px' }] - Configuration for IntersectionObserver used for lazy loading.
 */ const $db127449446b8099$var$options = {
    get selector () {
        return `[${this.tag}]`;
    },
    get altAttribute () {
        return `${this.tag}-alt`;
    },
    tag: null,
    modifiers: {
        loaded: "-loaded",
        loading: "-loading"
    },
    onLoaded: (element)=>{},
    onError: (element, error)=>{
        console.error("\uD83D\uDE80 Error on ~ element, error:", element, error);
    },
    observer: {
        root: null,
        threshold: 1,
        rootMargin: "100% 0px"
    }
};
var $db127449446b8099$export$2e2bcd8739ae039 = $db127449446b8099$var$options;


/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} element - The image element to load the asset for.
 * @param {string} src - The asset path attribute value.
 * @param {string} alt - The asset alt attribute value.
 */ const $fa423858cf60d4ae$var$loadImage = (element, src, alt = null)=>{
    element.src = src;
    if (alt) element.alt = alt;
};
/**
 * Loads the asset for the given picture element.
 *
 * @private
 *
 * @param {HTMLPictureElement} element - The picture element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 * @param {string} alt - The asset alt attribute value.
 */ const $fa423858cf60d4ae$var$loadPicture = (element, src, alt)=>{
    let img = element.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        element.append(img);
    }
    $fa423858cf60d4ae$var$loadImage(img, src, alt);
};
/**
 * Loads the asset for the given video element.
 *
 * @private
 *
 * @param {HTMLVideoElement} element - The video element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 */ const $fa423858cf60d4ae$var$loadVideo = (element, src)=>{
    element.src = src;
};
/**
 * Loads the asset for the given element based on its type (img, picture, video).
 *
 * @private
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */ const $fa423858cf60d4ae$var$loadAsset = (element, options)=>{
    const { tag: tag, altAttr: altAttr } = options;
    const assetLoaders = {
        img: $fa423858cf60d4ae$var$loadImage,
        picture: $fa423858cf60d4ae$var$loadPicture,
        video: $fa423858cf60d4ae$var$loadVideo
    };
    const handleLoadEvent = ()=>{
        element.classList.remove(options.modifiers.loading);
        element.removeAttribute(options.tag);
        element.classList.add(options.modifiers.loaded);
        options.onLoaded(element);
        element.removeEventListener("load", handleLoadEvent);
    };
    const elementType = element.tagName.toLowerCase();
    const assetLoader = assetLoaders[elementType];
    const assetPath = element.getAttribute(tag);
    const assetAltValue = element.getAttribute(altAttr);
    assetLoader(element, assetPath, assetAltValue);
    element.classList.add(options.modifiers.loading);
    element.addEventListener("load", handleLoadEvent);
};
var $fa423858cf60d4ae$export$2e2bcd8739ae039 = $fa423858cf60d4ae$var$loadAsset;


/**
 * Lazy load assets.
 *
 * @param {Object} [customOptions={}] - Additional options for configuring the lazy loading behavior.
 */ const $82cbb5a2f3a1bcd0$var$lazyLoad = (tag = "lazy", customOptions = {})=>{
    (0, $db127449446b8099$export$2e2bcd8739ae039).tag = tag;
    /**
   * Options object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */ const options = {
        ...(0, $db127449446b8099$export$2e2bcd8739ae039),
        ...customOptions
    };
    /**
   * Handles the intersection of lazy load elements.
   *
   * @private
   *
   * @param {IntersectionObserverEntry[]} entries - The entries for the intersection observer.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */ const handleIntersection = (entries, observer)=>{
        const handler = (entry)=>{
            const { target: target, isIntersecting: isIntersecting } = entry;
            if (!isIntersecting) return;
            try {
                (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, options);
            } catch (error) {
                options.onError(target, error);
            } finally{
                observer.unobserve(target); // bunun tam testini yapmak lazim
            }
        };
        entries.forEach(handler);
    };
    /**
   * IntersectionObserver used for lazy loading.
   *
   * @type {IntersectionObserver}
   */ const observer = new IntersectionObserver(handleIntersection, options.observer);
    /**
   * NodeList of lazy loadable elements.
   *
   * @type {NodeList}
   */ const lazyLoadItems = document.querySelectorAll(options.selector);
    if (!lazyLoadItems.length) {
        console.warn("\uD83D\uDE80 No lazy loadable element found.");
        return;
    }
    lazyLoadItems.forEach((item)=>observer.observe(item));
};
var $82cbb5a2f3a1bcd0$export$2e2bcd8739ae039 = $82cbb5a2f3a1bcd0$var$lazyLoad;


export {$82cbb5a2f3a1bcd0$export$2e2bcd8739ae039 as default};
