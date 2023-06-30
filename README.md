# Lazy Load Images

Lazy Load Images is a JavaScript utility that allows you to lazy load visual content when it approaches the visible area of the screen. This technique helps improve page loading speed by deferring the loading of images until they are actually needed.

## Usage

To use Lazy Load Images, include the `lazyLoadImages` function in your JavaScript code. The function takes two optional parameters:

- `selector` (string, default: '[lazy]'): CSS selector for lazy load items.
- `options` (object): IntersectionObserver options.

If no selector is provided, the default selector '[lazy]' will be used.
If no options are provided, default options will be used.

```html
<img lazy="Path Of Asset" />
<video lazy="Path Of Asset"></video>
```

```javascript
lazyLoad();

// Or

lazyLoad('[lazy]', {
  root: null,
  threshold: 1,
  rootMargin: '300px 0px',
});
```

The lazy load functionality will be applied to all elements that match the given selector. When an element approaches the visible area of the screen, its 'lazy' attribute will be used as the source for the 'src' attribute, and the element will be marked as loaded by adding the '-loaded' class.

## Developer

[@drementer](https://github.com/drementer)

## License

[MIT](https://choosealicense.com/licenses/mit/)
