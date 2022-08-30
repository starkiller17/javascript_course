// Import NodeJS path package
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    // Starts at the current path with __dirname
    //  and then add the following folders
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/',
  },
  devtool: 'cheap-source-map',
  // get the index.html(root file).
  // This is because the html file is in the root dir, not in the assets,
  // and that is the reason why you cannot get that.
  devServer: {
    static: {
      directory: './',
    },
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
