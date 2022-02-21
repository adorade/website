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
} from './plugins.js';

// Settings
export { pkg, title, time, arg, isClean, isProd, isSilent } from './settings.js';

// Dirs and Paths configuration
export { dirs, paths } from './paths.js';

// Options
export { opts } from './options.js';

// Rollup Configuration
export { inputOpts, outputOpts } from '../rollup/rollup-config.js';

// Template for banner to add to file headers
export { banner } from './banner.js';
