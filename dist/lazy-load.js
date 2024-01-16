/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ var $caecf5182af9e868$export$2e2bcd8739ae039 = {
    attrs: {
        src: "lazy",
        srcset: "lazy-srcset",
        poster: "lazy-poster"
    },
    modifiers: {
        loaded: "-loaded",
        loading: "-loading"
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


const $94035bc41cd26735$var$resetAssets = (element, options)=>{
    element.removeAttribute(options.attrs.src);
    element.removeAttribute(options.attrs.srcset);
    element.removeAttribute(options.attrs.poster);
};
const $94035bc41cd26735$var$states = {
    loading: (element, options)=>{
        const handleLoad = ()=>$94035bc41cd26735$var$states.loaded(element, options);
        element.classList.add(options.modifiers.loading);
        element.addEventListener("load", handleLoad, {
            once: true
        });
    },
    loaded: (element, options)=>{
        element.classList.remove(options.modifiers.loading);
        element.classList.add(options.modifiers.loaded);
        $94035bc41cd26735$var$resetAssets(element, options);
        options.onLoaded(element);
    },
    error: (element, options, error)=>{
        element.classList.remove(options.modifiers.loading);
        options.onError(element, error);
    }
};
var $94035bc41cd26735$export$2e2bcd8739ae039 = $94035bc41cd26735$var$states;


var $fa423858cf60d4ae$export$2e2bcd8739ae039 = (element, options)=>{
    const assets = {
        src: element.getAttribute(options.attrs.src),
        srcset: element.getAttribute(options.attrs.srcset),
        poster: element.getAttribute(options.attrs.poster)
    };
    if (assets.src) element.setAttribute("src", assets.src);
    if (assets.srcset) element.setAttribute("srcset", assets.srcset);
    if (assets.poster) element.setAttribute("poster", assets.poster);
};


const $3557b12f3d798a99$var$supportedElements = [
    "img",
    "picture",
    "video",
    "embed",
    "object"
];
var $3557b12f3d798a99$export$2e2bcd8739ae039 = (element)=>{
    const elementType = element.tagName.toLowerCase();
    const isSupported = $3557b12f3d798a99$var$supportedElements.includes(elementType);
    if (isSupported) return true;
    throw new Error(`Element type ${elementType} is not supported!`);
};


var $5aa3f28da5200ea6$export$2e2bcd8739ae039 = (item, callback, settings)=>{
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


var $e5a64a9b43e3c02c$export$2e2bcd8739ae039 = (selector, root = document)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return root.querySelectorAll(selector);
};


var $3e2aed16982f049f$export$2e2bcd8739ae039 = (selector, customOptions = {})=>{
    const options = {
        ...(0, $caecf5182af9e868$export$2e2bcd8739ae039),
        ...customOptions
    };
    const lazyItems = (0, $e5a64a9b43e3c02c$export$2e2bcd8739ae039)(selector);
    if (!lazyItems.length) return console.error("No lazy loadable element found!");
    const observerCallback = (target)=>{
        (0, $94035bc41cd26735$export$2e2bcd8739ae039).loading(target, options);
        (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, options);
    };
    lazyItems.forEach((item)=>{
        try {
            (0, $3557b12f3d798a99$export$2e2bcd8739ae039)(item);
            (0, $5aa3f28da5200ea6$export$2e2bcd8739ae039)(item, observerCallback, options.observer);
        } catch (error) {
            (0, $94035bc41cd26735$export$2e2bcd8739ae039).error(item, options, error.message);
        }
    });
};


export {$3e2aed16982f049f$export$2e2bcd8739ae039 as default};
