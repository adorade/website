/*!
 * Adorade (v1.0.0): tools/util/plugins.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Importing specific gulp API functions lets us write them as series() instead of gulp.series()
import gulp from 'gulp';
export const { src, dest, series, parallel, lastRun, watch, tree } = gulp;

// Fetch command line arguments for development or production environment
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

// Load others modules
import * as fs from 'fs';
import del from 'del';
import size from 'gulp-size';
import browserSync from 'browser-sync';
const bs = browserSync.create();

export { args, fs, del, size, bs };

// Fancy log with colors
import log from 'fancy-log';
export const fancyLog = log;
import colors from 'ansi-colors';
export const { bgBlue, bgRed, cyan, green, magenta, red } = colors;
