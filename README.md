# Lazy Load Images

Lazy Load Images is a JavaScript utility that allows you to lazy load visual content when it approaches the visible area of the screen. This technique helps improve page loading speed by deferring the loading of images until they are actually needed.

## Usage

To use Lazy Load Images, include the `lazyLoad` function in your JavaScript code. The function takes two optional parameters:

- `selector` (string, default: 'lazy'): CSS selector for lazy load items.
- `observerOptions` (object): Options for the Intersection Observer.

If no selector is provided, the default selector 'lazy' will be used.
If no observer options are provided, default options will be used.

```javascript
lazyLoad('lazy', {
  root: null,
  threshold: 1,
  rootMargin: '300px 0px',
});
```

The lazy load functionality will be applied to all elements that match the specified selector. When an element comes into view, its 'lazy' attribute will be used as the source for the 'src' attribute, and the element will be marked as loaded by adding the '-loaded' class.

## License

[MIT License](https://choosealicense.com/licenses/mit/).
