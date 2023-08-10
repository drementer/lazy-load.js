/**
 * Default options for lazy loading behavior.
 *
 * @type {Object}
 *
 * @param {string} [tag=selector] - The CSS selector for lazy loadable elements.
 * @param {string} [toggleClass="-loaded"] - The class name to toggle on elements after loading.
 * @param {Function} [onLoaded] - Callback function to execute when an element is successfully loaded.
 * @param {Function} [onError] - Callback function to execute when an error occurs during loading.
 * @param {Object} [observer={ root: null, threshold: 1, rootMargin: '300px 0px' }] - Configuration for IntersectionObserver used for lazy loading.
 */ const $db127449446b8099$var$defaultOptions = {
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
var $db127449446b8099$export$2e2bcd8739ae039 = $db127449446b8099$var$defaultOptions;


/**
 * Loads the asset for the given image element.
 *
 * @private
 *
 * @param {HTMLImageElement} img - The image element to load the asset for.
 * @param {string} assetAttr - The asset URL attribute value.
 * @param {string} assetAlt - The asset alt attribute value.
 */ const $fa423858cf60d4ae$var$loadImage = (img, assetAttr, assetAlt)=>{
    img.src = assetAttr;
    img.alt = assetAlt;
};
const $fa423858cf60d4ae$var$loadBackground = (element, assetAttr)=>{
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
 */ const $fa423858cf60d4ae$var$loadPicture = (element, assetAttr, assetAlt)=>{
    let img = element.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        element.append(img);
    }
    $fa423858cf60d4ae$var$loadImage(img, assetAttr, assetAlt);
};
/**
 * Loads the asset for the given video element.
 *
 * @private
 *
 * @param {HTMLVideoElement} element - The video element to load the asset for.
 * @param {string} assetAttr - The asset URL attribute value.
 */ const $fa423858cf60d4ae$var$loadVideo = (element, assetAttr)=>{
    element.src = assetAttr;
};
/**
 * Loads the asset for the given element based on its type (img, picture, video).
 *
 * @private
 *
 * @param {HTMLElement} element - The element to load the asset for.
 */ const $fa423858cf60d4ae$var$loadAsset = (element, options)=>{
    const { tag: tag } = options;
    const elementType = element.tagName.toLowerCase();
    const isImage = elementType === "img";
    const isPicture = elementType === "picture";
    const isVideo = elementType === "video";
    const assetAttr = element.getAttribute(`${tag}-src`);
    const assetAlt = element.getAttribute(`${tag}-alt`) || "";
    const backgroundAttr = element.getAttribute(`${tag}-background`);
    if (backgroundAttr) return $fa423858cf60d4ae$var$loadBackground(element, backgroundAttr);
    if (isImage) return $fa423858cf60d4ae$var$loadImage(element, assetAttr, assetAlt);
    if (isPicture) return $fa423858cf60d4ae$var$loadPicture(element, assetAttr, assetAlt);
    if (isVideo) return $fa423858cf60d4ae$var$loadVideo(element, assetAttr);
    element.src = assetAttr;
};
var $fa423858cf60d4ae$export$2e2bcd8739ae039 = $fa423858cf60d4ae$var$loadAsset;


/**
 * Lazy load assets.
 *
 * @param {string} [selector="[lazy]"] - The CSS selector for lazy loadable elements.
 * @param {Object} [settings={}] - Additional options for configuring the lazy loading behavior.
 */ const $82cbb5a2f3a1bcd0$var$lazyLoad = (settings = {})=>{
    /**
   * Options object for configuring the lazy loading behavior.
   *
   * @type {Object}
   */ const options = {
        ...(0, $db127449446b8099$export$2e2bcd8739ae039),
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
                (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, options);
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
var $82cbb5a2f3a1bcd0$export$2e2bcd8739ae039 = $82cbb5a2f3a1bcd0$var$lazyLoad;


export {$82cbb5a2f3a1bcd0$export$2e2bcd8739ae039 as default};
