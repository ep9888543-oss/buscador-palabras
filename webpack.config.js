const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/buscador-palabras/', // nombre de tu repo (para GitHub Pages)
  },

  module: {
    rules: [
      {
        // Transpila ES6+ con Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // Permite hacer `import './archivo.css'` dentro del JS
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Buscador de palabras',
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: '/buscador-palabras/', // abre la ruta correcta
    hot: true,
  },

  devtool: 'source-map',
};