# Lazy-load.js

A lightweight lazy loading library for modern browsers.

## Features

- Simple and lightweight structure
- Configurable options
- Uses IntersectionObserver API
- Support for various media types (img, video, iframe, etc.)
- Event system for better control

## Installation

```bash
# with npm
npm install lazy-load.js

# or with yarn
yarn add lazy-load.js
```

## Basic Usage

HTML:
```html
<img lazy="image-path.jpg" alt="Lazy loaded image">
<video lazy="video-path.mp4" controls></video>
<iframe lazy="iframe-path.html"></iframe>
```

JavaScript:
```javascript
import lazyLoad from 'lazy-load.js';

// Start with default settings
const loader = lazyLoad();

// Listen to events
loader.on('loaded', (element) => {
  console.log('Element loaded:', element);
});

loader.on('error', (element, error) => {
  console.error('Loading error:', error, element);
});

// or with custom options
const customLoader = lazyLoad('[lazy]', {
  observer: {
    rootMargin: '200px 0px',
    threshold: 0.1
  }
});

// You can also add event listeners this way
customLoader.on('waiting', (element) => {
  console.log('Element waiting to be visible:', element);
});

// One-time event listener
customLoader.once('loaded', (element) => {
  console.log('This will only be called once for the first loaded element');
});

// Remove specific event listener
const myHandler = (element) => console.log('Element loaded:', element);
customLoader.on('loaded', myHandler);
customLoader.off('loaded', myHandler);
```

## Custom Attributes

- `lazy`: Main lazy loading attribute for src
- `lazy-srcset`: For srcset in img elements
- `lazy-poster`: For poster in video elements

## State Information

The library adds a `lazy-state` attribute to elements at each stage of the loading process:

- `waiting`: Element is not yet visible
- `loading`: Element is visible and loading
- `loaded`: Element has loaded successfully
- `error`: An error occurred during loading

You can apply CSS styles based on this attribute:

```css
[lazy-state="loading"] {
  filter: blur(5px);
  transition: filter 0.3s;
}

[lazy-state="loaded"] {
  filter: blur(0);
}

[lazy-state="error"] {
  opacity: 0.5;
  filter: grayscale(100%);
}
```

## All Settings

```javascript
{
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  }
}
```

## Events

The library provides an event system for better control over the loading process:

- `waiting`: Fired when element is not yet visible
- `loading`: Fired when element starts loading
- `loaded`: Fired when element is loaded successfully
- `error`: Fired when loading fails

## Browser Support

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 79+

## License

MIT
