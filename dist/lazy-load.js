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
 */ const $50e97065b94a2e88$var$defaultOptions = {
    tag: "lazy",
    selector: "[lazy]",
    toggleClass: "-loaded",
    onLoaded: ()=>{},
    onError: (element, error)=>{
        console.error("\uD83D\uDE80 Error on ~ element, error:", element, error);
    },
    observer: {
        root: null,
        threshold: 1,
        rootMargin: "100% 0px"
    }
};
var $50e97065b94a2e88$export$2e2bcd8739ae039 = $50e97065b94a2e88$var$defaultOptions;


/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} element - The image element to load the asset for.
 * @param {string} src - The asset path attribute value.
 * @param {string} alt - The asset alt attribute value.
 */ const $f85e789b098d4f3c$var$loadImage = (element, src, alt)=>{
    element.src = src;
    element.alt = alt;
};
const $f85e789b098d4f3c$var$loadBackground = (element, src)=>{
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
 */ const $f85e789b098d4f3c$var$loadPicture = (element, src, alt)=>{
    let img = element.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        element.append(img);
    }
    $f85e789b098d4f3c$var$loadImage(img, src, alt);
};
/**
 * Loads the asset for the given video element.
 *
 * @private
 *
 * @param {HTMLVideoElement} element - The video element to load the asset for.
 * @param {string} src - The asset URL attribute value.
 */ const $f85e789b098d4f3c$var$loadVideo = (element, src)=>{
    element.src = src;
};
/**
 * Loads the asset for the given element based on its type (img, picture, video).
 *
 * @private
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */ const $f85e789b098d4f3c$var$loadAsset = (element, options)=>{
    const { tag: tag } = options;
    const loadFunctions = {
        img: $f85e789b098d4f3c$var$loadImage,
        picture: $f85e789b098d4f3c$var$loadPicture,
        video: $f85e789b098d4f3c$var$loadVideo
    };
    const elementType = element.tagName.toLowerCase();
    const loadFunction = loadFunctions[elementType];
    const assetAttr = element.getAttribute(`${tag}-src`);
    const assetAlt = element.getAttribute(`${tag}-alt`) || "";
    const backgroundAttr = element.getAttribute(`${tag}-background`);
    if (backgroundAttr) return $f85e789b098d4f3c$var$loadBackground(element, backgroundAttr);
    if (loadFunction) return loadFunction(element, assetAttr, assetAlt);
    throw new Error(`Invalid element type: ${elementType}`);
};
var $f85e789b098d4f3c$export$2e2bcd8739ae039 = $f85e789b098d4f3c$var$loadAsset;


/**
 * Lazy load assets.
 *
 * @param {string} [selector="[lazy]"] - The CSS selector for lazy loadable elements.
 * @param {Object} [settings={}] - Additional options for configuring the lazy loading behavior.
 */ const $cf838c15c8b009ba$var$lazyLoad = (settings = {})=>{
    /**
   * Options object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */ const options = {
        ...(0, $50e97065b94a2e88$export$2e2bcd8739ae039),
        ...settings
    };
    /**
   * Handles the intersection of lazy load elements.
   *
   * @private
   *
   * @param {IntersectionObserverEntry[]} entries - The entries for the intersection observer.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */ const handleIntersection = (entries, observer)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            const { target: target } = entry;
            try {
                (0, $f85e789b098d4f3c$export$2e2bcd8739ae039)(target, options);
                options.onLoaded(target);
            } catch (error) {
                options.onError(target, error);
            } finally{
                observer.unobserve(target); // bunun tam testini yapmak lazim
            }
        });
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
    lazyLoadItems.forEach((item)=>observer.observe(item));
};
var $cf838c15c8b009ba$export$2e2bcd8739ae039 = $cf838c15c8b009ba$var$lazyLoad;


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=lazy-load.js.map
