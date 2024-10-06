/*!
 * Adorade (v2.2.0): tools/utils/plugins.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Importing specific gulp API functions lets us write them as series() instead of gulp.series()
export { src, dest, series, parallel, lastRun, watch, tree } from 'gulp';

// Fetch command line arguments for development or production environment
// see: ./settings.js

// Load others modules
import * as fs from 'fs';
import { deleteAsync as del } from 'del';
import size from 'gulp-size';
import browserSync from 'browser-sync';
const bs = browserSync.create();

export { fs, del, size, bs };

// Fancy log with colors
import log from 'fancy-log';
export const fancyLog = log;
import colors from 'ansi-colors';
export const { bgBlue, bgRed, cyan, green, magenta, red } = colors;

// Load specific modules
import cached from 'gulp-cached';
import header from 'gulp-header';
import rename from 'gulp-rename';
export { cached, header, rename };
