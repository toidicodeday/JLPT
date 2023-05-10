module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react-hooks/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "semi": ["error", "never"],
    "no-trailing-spaces": ["error"],
    "react/jsx-tag-spacing": ["error"],
    "eol-last": ["error"],
    "object-curly-spacing": ["error"],
    "react/jsx-indent": [2, 2],
    "comma-dangle": ["error"],
    "react/jsx-indent-props": [2, 2],
    "keyword-spacing": ["error"],
    "space-before-blocks": ["error"],
    "no-multi-spaces": ["error"],
    "comma-spacing": ["error"],
    "quote-props": ["error"],
    "array-bracket-newline": ["error"],
    "array-bracket-spacing": ["error"],
    "object-curly-spacing": ["always"],
    "block-spacing": ["error"],
    "brace-style": ["error"],
    "camelcase": ["warn"],
    "no-plusplus": "off",
    "@typescript-eslint/ban-types": "off",
    "react/jsx-max-props-per-line": "off",
    "prefer-promise-reject-errors": "off",
    "consistent-return": "off",
    "no-case-declarations": "off",
    "no-restricted-syntax": "off",
    "array-callback-return": "off",
    "react/no-array-index-key": "off",
    "react/jsx-filename-extension": "off",
  }
}
