import assetLoader from '../src/services/assetLoader.js';

const createElement = (tagName) => {
  return {
    tagName: tagName.toUpperCase(),
    attributes: new Map(),
    getAttribute(name) {
      /**
       * Simulates real DOM getAttribute behavior:
       * - Returns the attribute value if it exists (including empty strings)
       * - Returns null if the attribute doesn't exist
       */
      return this.attributes.has(name) ? this.attributes.get(name) : null;
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    },
    removeAttribute(name) {
      this.attributes.delete(name);
    },
  };
};

const options = {
  attrs: {
    src: 'data-src',
    srcset: 'data-srcset',
    poster: 'data-poster',
  },
};

describe('loadAttribute functionality', () => {
  let element;
  beforeEach(() => (element = createElement('img')));

  it('should load and remove lazy attribute when value exists', () => {
    element.setAttribute('data-src', 'test-image.jpg');

    assetLoader(element, options);
    expect(element.getAttribute('src')).toBe('test-image.jpg');
    expect(element.getAttribute('data-src')).toBeNull();
  });

  it('should not modify element when lazy attribute is empty', () => {
    element.setAttribute('data-src', '');

    assetLoader(element, options);
    expect(element.getAttribute('src')).toBeNull();
    expect(element.getAttribute('data-src')).toBe('');
  });

  it('should not modify element when lazy attribute does not exist', () => {
    assetLoader(element, options);
    expect(element.getAttribute('src')).toBeNull();
    expect(element.getAttribute('data-src')).toBeNull();
  });
});

describe('Image loading', () => {
  let element;
  beforeEach(() => (element = createElement('img')));

  it('should load src and srcset for image elements', () => {
    element.setAttribute('data-src', 'image.jpg');
    element.setAttribute('data-srcset', 'image-2x.jpg 2x');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('image.jpg');
    expect(element.getAttribute('srcset')).toBe('image-2x.jpg 2x');
    expect(element.getAttribute('data-src')).toBeNull();
    expect(element.getAttribute('data-srcset')).toBeNull();
  });

  it('should handle image with only src attribute', () => {
    element.setAttribute('data-src', 'single-image.jpg');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('single-image.jpg');
    expect(element.getAttribute('srcset')).toBeNull();
  });

  it('should handle image with only srcset attribute', () => {
    element.setAttribute(
      'data-srcset',
      'responsive.jpg 1x, responsive-2x.jpg 2x'
    );

    assetLoader(element, options);

    expect(element.getAttribute('srcset')).toBe(
      'responsive.jpg 1x, responsive-2x.jpg 2x'
    );
    expect(element.getAttribute('src')).toBeNull();
  });
});

describe('Video loading', () => {
  let element;
  beforeEach(() => (element = createElement('video')));

  it('should load src and poster for video elements', () => {
    element.setAttribute('data-src', 'video.mp4');
    element.setAttribute('data-poster', 'poster.jpg');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('video.mp4');
    expect(element.getAttribute('poster')).toBe('poster.jpg');
    expect(element.getAttribute('data-src')).toBeNull();
    expect(element.getAttribute('data-poster')).toBeNull();
  });

  it('should handle video with only src attribute', () => {
    element.setAttribute('data-src', 'video-only.mp4');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('video-only.mp4');
    expect(element.getAttribute('poster')).toBeNull();
  });
});

describe('Iframe loading', () => {
  let element;
  beforeEach(() => (element = createElement('iframe')));

  it('should load src for iframe elements', () => {
    element.setAttribute('data-src', 'https://example.com');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('https://example.com');
    expect(element.getAttribute('data-src')).toBeNull();
  });

  it('should handle iframe without src attribute', () => {
    assetLoader(element, options);
    expect(element.getAttribute('src')).toBeNull();
  });
});

describe('Default loading', () => {
  it('should handle unknown elements with default loader', () => {
    const element = createElement('div');
    element.setAttribute('data-src', 'background.jpg');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('background.jpg');
    expect(element.getAttribute('data-src')).toBeNull();
  });

  it('should process all attributes for default elements', () => {
    const element = createElement('section');
    element.setAttribute('data-src', 'bg.jpg');
    element.setAttribute('data-srcset', 'bg-2x.jpg 2x');
    element.setAttribute('data-poster', 'thumb.jpg');

    assetLoader(element, options);

    expect(element.getAttribute('src')).toBe('bg.jpg');
    expect(element.getAttribute('srcset')).toBe('bg-2x.jpg 2x');
    expect(element.getAttribute('poster')).toBe('thumb.jpg');
    expect(element.getAttribute('data-src')).toBeNull();
    expect(element.getAttribute('data-srcset')).toBeNull();
    expect(element.getAttribute('data-poster')).toBeNull();
  });
});

describe('Error handling', () => {
  it('should log warning and re-throw error when loading fails', () => {
    const element = createElement('img');
    spyOn(console, 'warn');

    const originalGetAttribute = element.getAttribute;
    element.getAttribute = jasmine
      .createSpy('getAttribute')
      .and.throwError('Test error');

    expect(() => {
      assetLoader(element, options);
    }).toThrowError('Test error');

    expect(console.warn).toHaveBeenCalledWith(
      'Failed to load media:',
      jasmine.any(Error)
    );

    element.getAttribute = originalGetAttribute;
  });
});

describe('Edge cases', () => {
  it('should handle elements with uppercase tagName', () => {
    const element = createElement('img');
    element.setAttribute('data-src', 'uppercase.jpg');

    assetLoader(element, options);
    expect(element.getAttribute('src')).toBe('uppercase.jpg');
  });

  it('should handle empty options', () => {
    const emptyOptions = { attrs: {} };
    const element = createElement('img');

    expect(() => {
      assetLoader(element, emptyOptions);
    }).not.toThrow();
  });
});
