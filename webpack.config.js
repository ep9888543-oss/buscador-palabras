// Configuración de Webpack: empaqueta el JS (transpilado con Babel),
// el CSS y genera el HTML final en la carpeta /dist.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Punto de entrada: desde aquí Webpack sigue todos los imports
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true, // limpia /dist en cada compilación
    publicPath: '/buscador-palabras/', // 👈 Actualizado con el nombre exacto de tu repo
  },

  module: {
    rules: [
      {
        // Transpila ES6+ a JavaScript compatible con Babel
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
    // Toma src/index.html como plantilla e inyecta el bundle automáticamente
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Buscador de palabras',
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
    hot: true,
  },

  devtool: 'source-map',
};