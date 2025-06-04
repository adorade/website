/*!
 * Adorade (v2.2.0): eslint.config.js
 * Copyright (c) 2019-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    name: 'recommended',
    ...js.configs.recommended
  },
  {
    name: 'default',
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  {
    name: 'stylistic',
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/block-spacing': 'error',
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': 'error',
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/indent': ['error', 2, {
        VariableDeclarator: { var: 2, let: 2, const: 3 },
        SwitchCase: 1
      }],
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 1 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always', { arraysInObjects: false }],
      '@stylistic/operator-linebreak': ['error', 'after', {
        overrides: { '?': 'before', ':': 'before' }
      }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': 'error'
    }
  },
  {
    name: 'tools',
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    files: [
      'gulpfile.mjs',
      'tools/**/*.mjs',
      'eslint.config.mjs'
    ],
    rules: {
      '@stylistic/semi': ['error', 'always']
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
