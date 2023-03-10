/*!
 * Adorade (v2.1.0): tools/util/plugins.js
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Importing specific gulp API functions lets us write them as series() instead of gulp.series()
import gulp from 'gulp';
export const { src, dest, series, parallel, lastRun, watch, tree } = gulp;

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
import concat from 'gulp-concat';
import header from 'gulp-header';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
export { cached, concat, header, rename, replace };
