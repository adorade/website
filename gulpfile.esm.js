/*!
 * Adorade (v1.0.0): gulpfile.esm.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, parallel } from './tools/util';
import {
  checks, clean, cleanCss, vendorCss, lintScss, compile, minify,
  cleanJs, vendorJs, lintEs, transpile, uglify,
  cleanImages, imagine, convert, cleanStatics, statica,
  cleanPages, lintPages, pagile, cleanDeploy, deploy, serve
} from './tools';

/**
 * Clean - clean all files from 'dist' folder
 * -------------------------------------------------------------------------- */
export { clean };

/**
 * Styles - processes style files
 * -------------------------------------------------------------------------- */
const styles = series(vendorCss, lintScss, compile, minify);
export const buildStyles = series(cleanCss, styles);

/**
 * Scripts - processes script files
 * -------------------------------------------------------------------------- */
const scripts = series(vendorJs, lintEs, transpile, uglify);
export const buildScripts = series(cleanJs, scripts);

/**
 * Images - processes image files
 * -------------------------------------------------------------------------- */
const images = series(imagine, convert);
export const buildImages = series(cleanImages, images);

/**
 * Statics - processes static files
 * -------------------------------------------------------------------------- */
const statics = parallel(statica);
export const buildStatics = series(cleanStatics, statics);

/**
 * Templates - processes templates files
 * -------------------------------------------------------------------------- */
const pages = series(lintPages, pagile);
export const buildPages = series(cleanPages, pages);

/**
 * Deploy to GitHub Pages
 * -------------------------------------------------------------------------- */
export const buildDeploy = series(cleanDeploy, deploy);

/**
 * Watch and Serve - watch files for changes and reload
 * Starts a BrowerSync instance
 * Watch files for changes
 * -------------------------------------------------------------------------- */
export { serve };

/**
 * Define `build` task - Specify if tasks run in series or parallel
 * -------------------------------------------------------------------------- */
export const build = series(
  clean, styles, scripts, images, statics, pages
);
build.description = 'Build task for production';

/**
 * Define `dev` task - build, edit source, reload
 * Runs all of the above tasks and then waits for files to change
 * -------------------------------------------------------------------------- */
export const dev = series(build, serve);
dev.description = 'Development task with serve';

/**
 * Define default task that can be called by just running `gulp` from cli
 * -------------------------------------------------------------------------- */
export default dev;

/**
 * Check dirs, paths, options and settings
 * -------------------------------------------------------------------------- */
export { checks };
