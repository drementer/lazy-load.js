/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ const $eca09eba1a2796e9$var$defaultSettings = {
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
var $eca09eba1a2796e9$export$2e2bcd8739ae039 = $eca09eba1a2796e9$var$defaultSettings;


const $fa423858cf60d4ae$var$regularLoad = (element, assets)=>{
    element.src = assets.src;
};
const $fa423858cf60d4ae$var$loadImage = (element, assets)=>{
    element.src = assets.src;
    if (assets.srcset) element.srcset = assets.srcset;
};
const $fa423858cf60d4ae$var$loadVideo = (element, assets)=>{
    element.src = assets.src;
    if (assets.poster) element.poster = assets.poster;
};
const $fa423858cf60d4ae$var$loadPicture = (element, assets)=>{
    let img = element.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        element.appendChild(img);
    }
    $fa423858cf60d4ae$var$loadImage(img, assets);
};
const $fa423858cf60d4ae$var$assetLoaders = {
    img: $fa423858cf60d4ae$var$loadImage,
    picture: $fa423858cf60d4ae$var$loadPicture,
    video: $fa423858cf60d4ae$var$loadVideo,
    iframe: $fa423858cf60d4ae$var$regularLoad,
    embed: $fa423858cf60d4ae$var$regularLoad,
    object: $fa423858cf60d4ae$var$regularLoad
};
const $fa423858cf60d4ae$var$loadAsset = (element, settings)=>{
    const elementType = element.tagName.toLowerCase();
    const assetLoader = $fa423858cf60d4ae$var$assetLoaders[elementType];
    if (!assetLoader) throw new Error(`Element type '${elementType}' is not supported!`);
    const assets = {
        src: element.getAttribute(settings.attrs.src),
        srcset: element.getAttribute(settings.attrs.srcset),
        poster: element.getAttribute(settings.attrs.poster)
    };
    const handleLoadEvent = ()=>{
        element.classList.remove(settings.modifiers.loading);
        element.classList.add(settings.modifiers.loaded);
        element.removeAttribute(settings.attrs.src);
        element.removeAttribute(settings.attrs.srcset);
        element.removeAttribute(settings.attrs.poster);
        settings.onLoaded(element);
    };
    assetLoader(element, assets);
    element.classList.add(settings.modifiers.loading);
    element.addEventListener("load", handleLoadEvent, {
        once: true
    });
};
var $fa423858cf60d4ae$export$2e2bcd8739ae039 = $fa423858cf60d4ae$var$loadAsset;


const $5aa3f28da5200ea6$var$observer = (item, callback, settings)=>{
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            callback(entry.target);
            observer.unobserve(entry.target);
        });
    }, settings);
    observer.observe(item);
};
var $5aa3f28da5200ea6$export$2e2bcd8739ae039 = $5aa3f28da5200ea6$var$observer;


const $e5a64a9b43e3c02c$export$73eac51a39d6b0eb = (selector, root = document)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return root.querySelectorAll(selector);
};


const $d582dd6eaccab18d$var$lazyLoad = (selector, customSettings = {})=>{
    const settings = {
        ...(0, $eca09eba1a2796e9$export$2e2bcd8739ae039),
        ...customSettings
    };
    const lazyItems = (0, $e5a64a9b43e3c02c$export$73eac51a39d6b0eb)(selector);
    if (!lazyItems.length) return console.warn("No lazy loadable element found!");
    const observerCallback = (target)=>{
        try {
            settings.onLoading(target);
            (0, $fa423858cf60d4ae$export$2e2bcd8739ae039)(target, settings);
        } catch (error) {
            settings.onError(target, error.message);
        }
    };
    lazyItems.forEach((item)=>(0, $5aa3f28da5200ea6$export$2e2bcd8739ae039)(item, observerCallback, settings.observer));
};
var $d582dd6eaccab18d$export$2e2bcd8739ae039 = $d582dd6eaccab18d$var$lazyLoad;


export {$d582dd6eaccab18d$export$2e2bcd8739ae039 as default};
