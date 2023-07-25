const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html',
      title: 'Text Editor'
    }),
    new WebpackPwaManifest({
      name: 'JATE',
      short_name: 'JATE',
      description: 'The text editor is a versatile application that allows users to create, edit, and format text-based content.',
      background_color: '#ffffff',
      theme_color: '#007bff',
      publicPath: './',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
      // Add other Workbox configurations here as needed
      // For example, you can set additional runtimeCaching strategies
           
    }),
  ],

  module: {
    rules: [
      // CSS Loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Babel configuration
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
