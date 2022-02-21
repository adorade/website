/*!
 * Adorade (v1.0.0): tools/utils/settings.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { fs } from './index.js';

export const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
export const title = `${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)}`;
export const time = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
);

/**
 * Pass Arguments to gulp tasks
 * -------------------------------------------------------------------------- */
export const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;

  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^-+/, '');

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }

  return arg;
})(process.argv);

// Cleaning up all generated files (Default: false)
// set to 'true' with command line option: '--clean'
export const isClean = arg.clean ? arg.clean : false;

// Production mode (Default: false)
// set to 'true' with command line option: '--production' or '--prod'
export const isProd = arg.production || arg.prod ? arg.production || arg.prod : false;

// Silent mode (Default: false)
// set to 'true' with command line option: '--silent'
export const isSilent = arg.silent ? arg.silent : false;
