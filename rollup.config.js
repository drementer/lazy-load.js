import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/lazy-load.js',
    format: 'umd',
    name: 'lazyLoad',
    exports: 'auto',
    banner: `/**
 * lazy-load.js
 * @version 0.0.8
 * @license MIT
 * @link https://github.com/drementer/lazy-load.js
 */`,
  },
  plugins: [
    terser({
      format: {
        comments: 'some'
      },
      mangle: {
        reserved: ['lazyLoad']
      }
    }),
  ],
};
