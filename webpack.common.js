const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'test-app': './src/test-app.js',
  },
  output: {
    filename: './src/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: './src/chunk/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { chrome: '78' },
                  modules: false,
                  useBuiltIns: 'entry',
                  corejs: 2,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'manifest.json', to: './' },
      { from: 'images', to: './images' },

      {
        from: 'node_modules/@webcomponents/webcomponentsjs/*js',
        to: './src/webcomponentsjs/',
        flatten: true,
      },
      {
        from: 'node_modules/@webcomponents/shadycss/*js',
        to: './src/shadycss/',
        flatten: true,
      },
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['test-app'],
    }),
  ],
};
