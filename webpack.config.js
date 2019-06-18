const path = require('path');

module.exports = options => {
  return {
    entry: './app/frontend/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'app', 'frontend', 'dist'),
    }
  }
}
