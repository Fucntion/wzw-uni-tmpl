module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard',
  ],
  globals: {
    getCurrentPages:'readonly',
    plus:'readonly',
    uni: 'readonly',
    requirePlugin:'readonly',
    Component:'readonly',
    swan: 'readonly',
    wx: 'readonly',
    my: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'vue',
  ],
  rules: {
    'camelcase': 0,
    'no-prototype-builtins': 0,
    'no-throw-literal': 0,
  },
}
