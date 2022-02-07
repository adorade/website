/*!
 * Adorade (v1.0.0): tools/rollup/rollup-config.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { babel } from '@rollup/plugin-babel';
import { isProd } from '../utils/index.js';

const filename = isProd ? 'script' : 'script-dev' ;

// Input Options
const plugins = [
  babel({
    // for more options see: .babelrc.js,
    babelHelpers: 'bundled'
  })
];

// Output Options
const file = `${filename}.js`;
const format = 'cjs';

export const inputOpts = {
  plugins
};

export const outputOpts = {
  file, format
};
