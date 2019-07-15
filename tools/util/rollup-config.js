/*!
 * Adorade (v1.0.0): tools/util/rollup-config.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import babel from 'rollup-plugin-babel';

// Input Options
const plugins = [
  babel({
    // for more options see: .babelrc.js,
    exclude: 'node_modules/**', // Only transpile our source code
    externalHelpersWhitelist: [ // Include only required helpers
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread'
    ]
  })
];

// Output Options
const file = 'script.js';
const name = 'script';
const format = 'cjs';

export const inputOpts = {
  plugins
};

export const outputOpts = {
  file, name, format
};
