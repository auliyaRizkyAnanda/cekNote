const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Atur mode ke 'development' untuk pengembangan
  entry: './main.js', // Entry point utama aplikasi Anda
  output: {
    filename: 'bundle.js', // Nama file bundle JavaScript yang dihasilkan
    path: path.resolve(__dirname, 'dist'), // Direktori output untuk bundle
    clean: true, // Membersihkan direktori output sebelum setiap build
  },
  devtool: 'inline-source-map', // Untuk debugging yang lebih baik di browser
  devServer: {
    static: './dist', // Direktori dari mana webpack-dev-server akan melayani konten statis
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Gunakan file index.html yang sudah ada sebagai template
      filename: 'index.html', // Nama file HTML output
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};