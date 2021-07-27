module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-underscore-dangle": 0,
    "no-console": ["error"],
    "func-names": ["error", "as-needed"],
  },
};
