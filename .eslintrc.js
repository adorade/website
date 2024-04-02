/*!
 * Adorade (v2.1.0): .eslintrc.js
 * Copyright (c) 2019-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    jquery: true,
    node: true
  },
  extends: 'eslint:recommended',
  plugins: [
    '@stylistic/js'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    '@stylistic/js/block-spacing': 'error',
    '@stylistic/js/comma-dangle': 'error',
    '@stylistic/js/comma-style': ['error', 'last'],
    '@stylistic/js/indent': ['error', 2, {
      VariableDeclarator: { var: 2, let: 2, const: 3 },
      SwitchCase: 1
    }],
    '@stylistic/js/no-floating-decimal': 'error',
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 1 }],
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/js/semi': ['error', 'never'],
    '@stylistic/js/space-before-function-paren': 'error'
  },
  overrides: [
    {
      files: [
        'gulpfile.mjs',
        'tools/**/*.mjs',
        '.eslintrc.js'
      ],
      rules: {
        '@stylistic/js/semi': ['error', 'always']
      }
    }
  ]
};
