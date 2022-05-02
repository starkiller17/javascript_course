// Import NodeJS path package
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    // Starts at the current path with __dirname
    //  and then add the following folders
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: '',
  },
};
