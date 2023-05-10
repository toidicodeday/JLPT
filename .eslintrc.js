// const fs = require('fs');
const path = require('path')

// const prettierOptions = path.resolve(__dirname, '.prettierrc.js')
const prettierOptions = require(path.resolve(__dirname, '.prettierrc.js'))

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react-hooks/recommended', 'react-app', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
}
