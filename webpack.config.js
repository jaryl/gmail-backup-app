const path = require('path');

module.exports = options => {
  return {
    entry: './app/frontend/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'app', 'frontend', 'dist'),
    },
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
