/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ /**
 * Default options for the lazy loading functionality.
 *
 * @module defaultOptions
 *
 * @property {Object} attrs - The attributes to be used for lazy loading.
 * @property {string} attrs.src - The attribute for the source of the media.
 * @property {string} attrs.srcset - The attribute for the source set of the media.
 * @property {string} attrs.poster - The attribute for the poster of the media.
 *
 * @property {Object} observer - The options for the Intersection Observer.
 * @property {Element} observer.root - The root element for the Intersection Observer.
 * @property {number} observer.threshold - The threshold for the Intersection Observer.
 * @property {string} observer.rootMargin - The root margin for the Intersection Observer.
 *
 * @property {Function} onLoaded - The callback to be executed when the media is loaded.
 * @property {Function} onLoading - The callback to be executed when the media is loading.
 * @property {Function} onError - The callback to be executed when there is an error loading the media.
 */ var $caecf5182af9e868$export$2e2bcd8739ae039 = {
    attrs: {
        src: "lazy",
        srcset: "lazy-srcset",
        poster: "lazy-poster"
    },
    observer: {
        root: null,
        threshold: 1,
        rootMargin: "100% 0px"
    },
    onLoaded: ()=>{},
    onLoading: ()=>{},
    onError: (element, error)=>console.error("Error on:", element, error)
};


/**
 * Default settings for the lazy loading functionality.
 *
 * @module settings
 *
 * @property {string} stateAttr - The attribute to store the state of the lazy loading process.
 * @property {Object} states - The possible states of the lazy loading process.
 * @property {string} states.waiting - The state when the element is waiting to be loaded.
 * @property {string} states.loading - The state when the element is currently loading.
 * @property {string} states.loaded - The state when the element has finished loading.
 * @property {string} states.error - The state when there was an error loading the element.
 * @property {Array.<string>} supportedElements - The types of elements that are supported for lazy loading.
 */ var $51e72698ed0f3e92$export$2e2bcd8739ae039 = {
    stateAttr: "lazy-state",
    states: {
        waiting: "waiting",
        loading: "loading",
        loaded: "loaded",
        error: "error"
    },
    supportedElements: [
        "img",
        "picture",
        "video",
        "embed",
        "object"
    ]
};


/**
 * Object managing different states.
 *
 * @module states
 *
 * @property {function} loading - Function handling loading state operations.
 * @property {function} loaded - Function handling loaded state operations.
 * @property {function} error - Function handling error state operations.
 */ const $94035bc41cd26735$var$states = {
    waiting: (element)=>{
        element.setAttribute((0, $51e72698ed0f3e92$export$2e2bcd8739ae039).stateAttr, (0, $51e72698ed0f3e92$export$2e2bcd8739ae039).states.waiting);
    },
    loading: (element, options)=>{
        const handleLoad = ()=>{
            $94035bc41cd26735$var$states.loaded(element, options);
        };
        const handleError = ()=>{
            $94035bc41cd26735$var$states.error(element, options, "loading media.");
        };
        element.addEventListener("load", handleLoad, {
            once: true
        });
        element.addEventListener("error", handleError, {
            once: true
        });
        element.setAttribute((0, $51e72698ed0f3e92$export$2e2bcd8739ae039).stateAttr, (0, $51e72698ed0f3e92$export$2e2bcd8739ae039).states.loading);
        options.onLoading(element);
    },
    loaded: (element, options)=>{
        element.setAttribute((0, $51e72698ed0f3e92$export$2e2bcd8739ae039).stateAttr, (0, $51e72698ed0f3e92$export$2e2bcd8739ae039).states.loaded);
        element.removeAttribute(options.attrs.src);
        element.removeAttribute(options.attrs.srcset);
        element.removeAttribute(options.attrs.poster);
        options.onLoaded(element);
    },
    error: (element, options, error)=>{
        element.setAttribute((0, $51e72698ed0f3e92$export$2e2bcd8739ae039).stateAttr, (0, $51e72698ed0f3e92$export$2e2bcd8739ae039).states.error);
        options.onError(element, error);
    }
};
var $94035bc41cd26735$export$2e2bcd8739ae039 = $94035bc41cd26735$var$states;


/**
 * Set attributes on the given HTML element based on the provided options.
 *
 * @module assetLoader
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} options - Options for attribute names.
 * @param {Object} options.attrs - Attribute names.
 * @param {string} [options.attrs.src] - Attribute name for 'src'.
 * @param {string} [options.attrs.srcset] - Attribute name for 'srcset'.
 * @param {string} [options.attrs.poster] - Attribute name for 'poster'.
 */ var $fa423858cf60d4ae$export$2e2bcd8739ae039 = (element, options)=>{
    const assets = {
        src: element.getAttribute(options.attrs.src),
        srcset: element.getAttribute(options.attrs.srcset),
        poster: element.getAttribute(options.attrs.poster)
    };
    if (assets.src) element.setAttribute("src", assets.src);
    if (assets.srcset) element.setAttribute("srcset", assets.srcset);
    if (assets.poster) element.setAttribute("poster", assets.poster);
};



var /**
 * Checks if the given HTML element is of a supported type.
 *
 * @module checkSupport
 *
 * @param {HTMLElement} element - The HTML element to be checked.
 * @throws {Error} Throws an error if the element type is not supported.
 * @returns {boolean} Returns true if the element type is supported.
 */ $4a8d64b6206062f5$export$2e2bcd8739ae039 = (element)=>{
    const elementType = element.tagName.toLowerCase();
    const isSupported = (0, $51e72698ed0f3e92$export$2e2bcd8739ae039).supportedElements.includes(elementType);
    if (isSupported) return true;
    throw new Error(`Element type ${elementType} is not supported!`);
};


/**
 * Creates an Intersection Observer and starts observing the given item.
 *
 * @module observer
 *
 * @param {Element} item - The DOM element to be observed.
 * @param {Function} callback - The function to be called when the item is intersecting.
 * @param {Object} settings - The options for the Intersection Observer.
 */ var $5aa3f28da5200ea6$export$2e2bcd8739ae039 = (item, callback, settings)=>{
    const handleIntersection = (entries, observer)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            callback(entry.target);
            observer.unobserve(entry.target);
        });
    };
    const observer = new IntersectionObserver(handleIntersection, settings);
    observer.observe(item);
};


/**
 * Select elements based on a given selector within a specified root element.
 *
 * @module getElements
 *
 * @param {string | Element | NodeList | Array} selector - The selector to match elements.
 * @returns {NodeList} - The NodeList containing the selected elements.
 */ var $e5a64a9b43e3c02c$export$2e2bcd8739ae039 = (selector)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return document.querySelectorAll(selector);
};


var $3e2aed16982f049f$export$2e2bcd8739ae039 = (selector, customOptions = {})=>{
    const options = {
        ...(0, $caecf5182af9e868$export$2e2bcd8739ae039),
        ...customOptions
    };
    const observerCallback = (target)=>{
        (0, $94035bc41cd26735$export$2e2bcd8739ae039).loading(target, options);
        (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, options);
    };
    const processLazyItem = (item)=>{
        try {
            (0, $94035bc41cd26735$export$2e2bcd8739ae039).waiting(item, options);
            (0, $4a8d64b6206062f5$export$2e2bcd8739ae039)(item);
            (0, $5aa3f28da5200ea6$export$2e2bcd8739ae039)(item, observerCallback, options.observer);
        } catch (error) {
            (0, $94035bc41cd26735$export$2e2bcd8739ae039).error(item, options, error.message);
        }
    };
    try {
        const lazyItems = (0, $e5a64a9b43e3c02c$export$2e2bcd8739ae039)(selector);
        if (!lazyItems.length) throw new Error("No lazy loadable element found!");
        lazyItems.forEach(processLazyItem);
    } catch (error) {
        console.error("Lazy error:", error.message);
    }
};


export {$3e2aed16982f049f$export$2e2bcd8739ae039 as default};
