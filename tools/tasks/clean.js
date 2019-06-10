/*!
 * Adorade (v1.0.0): tools/tasks/clean.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { args, $, green, magenta, dirs } from '../util';

let delTarget;

if (args.production) {
  delTarget = [`${dirs.dev}`, `${dirs.prod}`];
} else {
  delTarget = `${dirs.dev}`;
}

export function clean () {
  $.fancyLog(`${green('-> Clean all files')} in ${magenta(delTarget)} folder`);
  return $.del(delTarget);
}
clean.displayName = 'clean:all';
clean.description = 'Clean up dist folders';
