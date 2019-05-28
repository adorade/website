/*!
 * Adorade (v1.0.0): tools/util/plugins.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load gulp's API
export { src, dest, task, series, parallel, lastRun, watch, tree } from 'gulp';

// Load all plugins in "devDependencies" into the variable $
export const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  rename: {
    'gulp-stylelint': 'gStylelint',
    'gulp-eslint': 'gEslint',
    'gulp-pug-linter': 'pugLinter',
    'gulp-gh-pages': 'ghPages'
  }
});

export { bgBlue, bgRed, green, magenta, red } from 'ansi-colors';

// Load others modules
export const bs = require('browser-sync').create();
export const fs = require('fs');
export const http2 = require('http2');
