module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': ['off'],
  },
};
