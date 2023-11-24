/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ var $9be491445886d637$export$2e2bcd8739ae039 = {
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


const $f85e789b098d4f3c$var$regularLoad = (element, assets)=>{
    element.src = assets.src;
};
const $f85e789b098d4f3c$var$loadImage = (element, assets)=>{
    element.src = assets.src;
    if (assets.srcset) element.srcset = assets.srcset;
};
const $f85e789b098d4f3c$var$loadVideo = (element, assets)=>{
    element.src = assets.src;
    if (assets.poster) element.poster = assets.poster;
};
const $f85e789b098d4f3c$var$loadPicture = (element, assets)=>{
    let img = element.querySelector("img");
    if (!img) {
        img = document.createElement("img");
        element.appendChild(img);
    }
    $f85e789b098d4f3c$var$loadImage(img, assets);
};
const $f85e789b098d4f3c$var$assetLoaders = {
    img: $f85e789b098d4f3c$var$loadImage,
    picture: $f85e789b098d4f3c$var$loadPicture,
    video: $f85e789b098d4f3c$var$loadVideo,
    iframe: $f85e789b098d4f3c$var$regularLoad,
    embed: $f85e789b098d4f3c$var$regularLoad,
    object: $f85e789b098d4f3c$var$regularLoad
};
var $f85e789b098d4f3c$export$2e2bcd8739ae039 = (element, settings)=>{
    const elementType = element.tagName.toLowerCase();
    const assetLoader = $f85e789b098d4f3c$var$assetLoaders[elementType];
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


var $726175a518dac223$export$2e2bcd8739ae039 = (item, callback, settings)=>{
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            callback(entry.target);
            observer.unobserve(entry.target);
        });
    }, settings);
    observer.observe(item);
};


var $c64ba146cb242d62$export$2e2bcd8739ae039 = (selector, root = document)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return root.querySelectorAll(selector);
};


var $a118670bf7476f3e$export$2e2bcd8739ae039 = (selector, customSettings = {})=>{
    const settings = {
        ...(0, $9be491445886d637$export$2e2bcd8739ae039),
        ...customSettings
    };
    const lazyItems = (0, $c64ba146cb242d62$export$2e2bcd8739ae039)(selector);
    if (!lazyItems.length) return console.warn("No lazy loadable element found!");
    const observerCallback = (target)=>{
        try {
            settings.onLoading(target);
            (0, $f85e789b098d4f3c$export$2e2bcd8739ae039)(target, settings);
        } catch (error) {
            settings.onError(target, error.message);
        }
    };
    lazyItems.forEach((item)=>(0, $726175a518dac223$export$2e2bcd8739ae039)(item, observerCallback, settings.observer));
};


export {$a118670bf7476f3e$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=lazy-load.js.map
