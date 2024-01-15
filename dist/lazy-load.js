/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ var $eca09eba1a2796e9$export$2e2bcd8739ae039 = {
    attrs: {
        src: "lazy",
        srcset: "lazy-srcset",
        poster: "lazy-poster"
    },
    modifiers: {
        loaded: "-loaded",
        loading: "-loading"
    },
    onLoaded: ()=>{},
    onLoading: ()=>{},
    onError: (element, error)=>console.warn("Error on:", element, error),
    observer: {
        root: null,
        threshold: 1,
        rootMargin: "100% 0px"
    }
};


const $fa423858cf60d4ae$var$supportedElements = [
    "img",
    "picture",
    "video",
    "embed",
    "object"
];
const $fa423858cf60d4ae$var$loadAssets = (element, assets)=>{
    if (assets.src) element.setAttribute("src", assets.src);
    if (assets.srcset) element.setAttribute("srcset", assets.srcset);
    if (assets.poster) element.setAttribute("poster", assets.poster);
};
const $fa423858cf60d4ae$var$elementLoaded = (element, settings)=>{
    element.classList.add(settings.modifiers.loaded);
    element.classList.remove(settings.modifiers.loading);
    element.removeAttribute(settings.attrs.src);
    element.removeAttribute(settings.attrs.srcset);
    element.removeAttribute(settings.attrs.poster);
    settings.onLoaded(element);
};
var $fa423858cf60d4ae$export$2e2bcd8739ae039 = (element, settings)=>{
    const elementType = element.tagName.toLowerCase();
    const isSupported = $fa423858cf60d4ae$var$supportedElements.includes(elementType);
    if (!isSupported) return console.warn("Element not supported!", element);
    const assets = {
        src: element.getAttribute(settings.attrs.src),
        srcset: element.getAttribute(settings.attrs.srcset),
        poster: element.getAttribute(settings.attrs.poster)
    };
    const handleLoadEvent = ()=>$fa423858cf60d4ae$var$elementLoaded(element, settings);
    $fa423858cf60d4ae$var$loadAssets(element, assets);
    element.classList.add(settings.modifiers.loading);
    element.addEventListener("load", handleLoadEvent, {
        once: true
    });
};


function $5aa3f28da5200ea6$export$2e2bcd8739ae039(item, callback, settings) {
    const handleIntersection = (entries, observer)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            callback(entry.target);
            observer.unobserve(entry.target);
        });
    };
    const observer = new IntersectionObserver(handleIntersection, settings);
    observer.observe(item);
}


var $e5a64a9b43e3c02c$export$2e2bcd8739ae039 = (selector, root = document)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return root.querySelectorAll(selector);
};


var $3e2aed16982f049f$export$2e2bcd8739ae039 = (selector, customSettings = {})=>{
    const settings = {
        ...(0, $eca09eba1a2796e9$export$2e2bcd8739ae039),
        ...customSettings
    };
    const lazyItems = (0, $e5a64a9b43e3c02c$export$2e2bcd8739ae039)(selector);
    if (!lazyItems.length) return console.warn("No lazy loadable element found!");
    const observerCallback = (target)=>{
        try {
            settings.onLoading(target);
            (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, settings);
        } catch (error) {
            settings.onError(target, error.message);
        }
    };
    lazyItems.forEach((item)=>{
        (0, $5aa3f28da5200ea6$export$2e2bcd8739ae039)(item, observerCallback, settings.observer);
    });
};


export {$3e2aed16982f049f$export$2e2bcd8739ae039 as default};
