import checkSupport from '../src/utils/checkSupport.js';

const createElement = (tagName) => ({ tagName });

describe('Supported Elements', () => {
  const supportedElements = [
    'img',
    'video',
    'embed',
    'object',
    'iframe',
    'audio',
  ];

  const testSupportedElement = (elementType) => {
    it(`should support ${elementType} elements`, () => {
      const element = createElement(elementType);
      expect(() => checkSupport(element)).not.toThrow();
      expect(checkSupport(element)).toBe(true);
    });
  };

  supportedElements.forEach(testSupportedElement);
});

describe('Unsupported Elements', () => {
  const unsupportedElements = [
    'div',
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'section',
    'article',
    'header',
    'footer',
    'nav',
    'main',
    'aside',
  ];

  const testUnsupportedElement = (elementType) => {
    it(`should not support ${elementType} elements`, () => {
      const element = createElement(elementType);

      expect(() => checkSupport(element)).toThrowError(
        `${element.tagName} Element is not supported!`
      );
    });
  };

  unsupportedElements.forEach(testUnsupportedElement);
});

describe('Case Sensitivity', () => {
  it('should be case insensitive for supported elements', () => {
    const testCases = [
      createElement('img'),
      createElement('IMG'),
      createElement('Img'),
      createElement('iMg'),
    ];

    testCases.forEach((element) => {
      expect(() => checkSupport(element)).not.toThrow();
      expect(checkSupport(element)).toBe(true);
    });
  });

  it('should be case insensitive for unsupported elements', () => {
    const testCases = [
      createElement('div'),
      createElement('DIV'),
      createElement('Div'),
      createElement('dIv'),
    ];

    testCases.forEach(({ tagName }) => {
      const element = { tagName };
      expect(() => checkSupport(element)).toThrowError(
        `${tagName} Element is not supported!`
      );
    });
  });
});

describe('Error Scenarios', () => {
  it('should throw error when element is null', () => {
    expect(() => checkSupport(null)).toThrow();
  });

  it('should throw error when element is undefined', () => {
    expect(() => checkSupport(undefined)).toThrow();
  });

  it('should throw error when element has no tagName property', () => {
    const element = {};

    expect(() => checkSupport(element)).toThrow();
  });

  it('should throw error when tagName is null', () => {
    const element = { tagName: null };

    expect(() => checkSupport(element)).toThrow();
  });

  it('should throw error when tagName is undefined', () => {
    const element = { tagName: undefined };

    expect(() => checkSupport(element)).toThrow();
  });

  it('should throw error when tagName is not a string', () => {
    const element = { tagName: 123 };

    expect(() => checkSupport(element)).toThrow();
  });
});

describe('Return Values', () => {
  it('should not return anything for unsupported elements (throws before return)', () => {
    const element = createElement('div');

    expect(() => {
      const result = checkSupport(element);
      expect(result).toBeUndefined();
    }).toThrow();
  });
});

describe('Edge Cases', () => {
  it('should handle elements with extra whitespace in tagName', () => {
    const element = createElement(' IMG ');

    // Current implementation doesn't trim, so this should fail
    expect(() => checkSupport(element)).toThrowError(
      `${element.tagName} Element is not supported!`
    );
  });

  it('should handle empty tagName', () => {
    const element = createElement('');

    expect(() => checkSupport(element)).toThrowError(
      `${element.tagName} Element is not supported!`
    );
  });

  it('should handle custom elements', () => {
    const element = createElement('CUSTOM-ELEMENT');

    expect(() => checkSupport(element)).toThrowError(
      `${element.tagName} Element is not supported!`
    );
  });

  it('should handle web components', () => {
    const element = createElement('MY-VIDEO-PLAYER');

    expect(() => checkSupport(element)).toThrowError(
      `${element.tagName} Element is not supported!`
    );
  });
});

describe('Performance', () => {
  it('should handle multiple calls efficiently', () => {
    const element = createElement('img');

    const startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
      checkSupport(element);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(100);
  });

  it('should handle different elements in sequence', () => {
    const elements = [
      createElement('img'),
      createElement('video'),
      createElement('iframe'),
      createElement('audio'),
    ];

    expect(() => {
      elements.forEach((element) => checkSupport(element));
    }).not.toThrow();
  });
});
