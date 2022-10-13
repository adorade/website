/*!
 * Adorade (v1.0.0): tools/util/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load plugins
export {
  src, dest, series, parallel, lastRun, watch, tree,
  fs, del, size, bs,
  fancyLog, bgBlue, bgRed, cyan, green, magenta, red,
  cached, concat, header, rename, replace
} from './plugins.mjs';

// Settings
export { pkg, title, time, arg, isClean, isProd, isSilent } from './settings.mjs';

// Dirs and Paths configuration
export { dirs, paths } from './paths.mjs';

// Options
export { opts } from './options.mjs';

// Template for banner to add to file headers
export { banner } from './banner.mjs';
