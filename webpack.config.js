const path = require('path');

module.exports = options => {
  return {
    entry: {
      app: './app/frontend/app.js',
    },
    output: {
      path: path.resolve(__dirname, 'app', 'frontend', 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    }
  }
}
