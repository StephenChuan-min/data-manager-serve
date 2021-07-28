module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['prettier'],
  rules: {
    'max-len': ['error', { code: 300, ignoreUrls: true }],
    'prettier/prettier': 'error',
    'no-underscore-dangle': 0,
    'no-console': 1,
    'func-names': ['error', 'as-needed'],
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
  },
};
