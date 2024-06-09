/*!
 * Adorade (v2.1.0): eslint.config.js
 * Copyright (c) 2019-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    name: 'default',
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    }
  },
  {
    name: 'recommended',
    ...js.configs.recommended
  },
  {
    name: 'stylistic',
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/block-spacing': 'error',
      '@stylistic/js/brace-style': ['error', '1tbs'],
      '@stylistic/js/comma-dangle': 'error',
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/indent': ['error', 2, {
        VariableDeclarator: { var: 2, let: 2, const: 3 },
        SwitchCase: 1
      }],
      '@stylistic/js/no-floating-decimal': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 1 }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/operator-linebreak': ['error', 'after', {
        overrides: { '?': 'before', ':': 'before' }
      }],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/space-before-function-paren': 'error'
    }
  },
  {
    name: 'tools',
    files: [
      'gulpfile.mjs',
      'tools/**/*.mjs',
      'eslint.config.mjs'
    ],
    rules: {
      '@stylistic/js/semi': ['error', 'always']
    }
  },
  {
    name: 'ignore files',
    ignores: [
      '**/.*',
      '**/*.min.js',
      'dist',
      'tmp'
    ]
  }
];
