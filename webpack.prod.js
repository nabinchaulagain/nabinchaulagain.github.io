const merge = require('webpack-merge');
const { InjectManifest } = require('workbox-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new InjectManifest({
      swSrc: './service-worker.js',
      exclude: ['index.html', 'ckeditor.html'],
    }),
  ],
});
