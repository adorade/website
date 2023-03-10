/*!
 * Adorade (v2.1.0): tools/tasks/checks.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { tree, arg, fancyLog, green, magenta, dirs, paths, opts, banner } from '../utils/index.mjs';

export function checks (done) {
  const gulpTree = tree();

  fancyLog(`${green('Gulp Tasks:\n')}`, gulpTree.nodes);
  fancyLog(`${magenta('Directories configuration:\n')}`, dirs);
  fancyLog(`${magenta('Paths configuration:\n')}`, paths);
  fancyLog(`${magenta('Options configuration:\n')}`, opts);
  fancyLog(`${green('Banner:\n')}`, banner());

  if (Object.keys(arg).length < 1) {
    fancyLog(`${green('No Parameters')}`);
  } else {
    fancyLog(`${green('Parameters:\n')}`, arg);
  }

  done();
}
checks.displayName = 'check:settings';
checks.description = 'Check for settings';
