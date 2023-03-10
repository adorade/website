/*!
 * Adorade (v2.1.0): gulpfile.esm.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, isClean, isProd, isSilent, fancyLog, green } from './tools/utils/index.mjs';
import {
  help, checks, clean, cleanCss, vendorCss, lintScss, compile, minifyCss,
  cleanJs, vendorJs, lintMjs, transpile, minifyJs,
  cleanStatics, favicons, statica, cleanFonts, fontsCss, fontsSvg,
  cleanImages, imagine, convert, cleanPages, lintPages, pagile, pagify,
  serve, cleanSW, serviceWorker
} from './tools/index.mjs';

if (isClean) {
  fancyLog(`${green('Looks like we are cleaning up all generated files!')}`);
}

if (isProd && !isSilent) {
  fancyLog(`${green('Looks like we are in production mode!')}`);
} else if (!isSilent) {
  fancyLog(`${green('Looks like we are in development mode!')}`);
}

/**
 * Print HELP for this project
 * -------------------------------------------------------------------------- */
export { help };

/**
 * Check dirs, paths, options and settings
 * -------------------------------------------------------------------------- */
export { checks };

/**
 * Clean - clean all files from 'dist' folder
 * -------------------------------------------------------------------------- */
export { clean };

/**
 * Styles - processes style files
 * -------------------------------------------------------------------------- */
const styles = series(vendorCss, lintScss, compile, minifyCss);
export const buildStyles = series(cleanCss, styles);
buildStyles.displayName = 'build:styles';
buildStyles.description = 'Build only styles files';

/**
 * Scripts - processes script files
 * -------------------------------------------------------------------------- */
const scripts = series(vendorJs, lintMjs, transpile, minifyJs);
export const buildScripts = series(cleanJs, scripts);
buildScripts.displayName = 'build:scripts';
buildScripts.description = 'Build only scripts files';

/**
 * Images - processes image files
 * -------------------------------------------------------------------------- */
const images = series(imagine, convert);
export const buildImages = series(cleanImages, images);
buildImages.displayName = 'build:images';
buildImages.description = 'Build only images files';

/**
 * Statics - processes static files
 * -------------------------------------------------------------------------- */
const statics = series(favicons, statica);
export const buildStatics = series(cleanStatics, statics);
buildStatics.displayName = 'build:statics';
buildStatics.description = 'Build statics files';

/**
 * Fonts - processes font files
 * -------------------------------------------------------------------------- */
const fonts = series(fontsCss, fontsSvg);
export const buildFonts = series(cleanFonts, fonts);
buildFonts.displayName = 'build:fonts';
buildFonts.description = 'Build fonts files';

/**
 * Templates - processes templates files
 * -------------------------------------------------------------------------- */
const pages = series(lintPages, pagile, pagify);
export const buildPages = series(cleanPages, pages);
buildPages.displayName = 'build:pages';
buildPages.description = 'Build only html files';

/**
 * Watch and Serve - watch files for changes and reload
 * Starts a BrowerSync instance
 * Watch files for changes
 * -------------------------------------------------------------------------- */
export { serve };

/**
 * Precache files with workbox
 * -------------------------------------------------------------------------- */
const sw = serviceWorker;
export const buildSW = series(cleanSW, serviceWorker);
buildSW.displayName = 'build:sw';
buildSW.description = 'Build only Service Worker';

/**
 * Define `build` task - Specify if tasks run in series or parallel
 * -------------------------------------------------------------------------- */
export const build = series(
  clean, styles, scripts, images, statics, fonts, pages, sw
);
build.description = 'Build task for production';

/**
 * Define `dev` task - build, edit source, reload
 * Runs all of the above tasks and then waits for files to change
 * -------------------------------------------------------------------------- */
const dev = series(build, serve);
dev.description = 'Development task with serve';

/**
 * Define default task that can be called by just running `gulp` from cli
 * -------------------------------------------------------------------------- */
export default dev;
