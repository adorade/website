/*!
 * Adorade (v1.0.0): tools/util/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load plugins
export {
  src, dest, series, parallel, lastRun, watch, tree,
  args, fs, del, size, bs,
  fancyLog, bgBlue, bgRed, cyan, green, magenta, red
} from './plugins.js';

// Configuration
export { dirs, paths } from './config.js';

// Options
export { opts } from './options.js';

// Rollup Configuration
export { inputOpts, outputOpts } from '../rollup/rollup-config.js';

// Template for banner to add to file headers
export { banner } from './banner.js';
