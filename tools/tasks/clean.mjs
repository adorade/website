/*!
 * Adorade (v2.1.0): tools/tasks/clean.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { isClean, isProd, del, fancyLog, green, magenta, dirs } from '../utils/index.mjs';

let delTarget;

if (isClean || isProd) {
  delTarget = [`${dirs.dev}`, `${dirs.prod}`];
} else {
  delTarget = `${dirs.dev}`;
}

export async function clean () {
  await del(delTarget);
  fancyLog(`${green('-> Clean all files')} in ${magenta(delTarget)} folder`);
}
clean.displayName = 'clean:all';
clean.description = 'Clean up dist folders';
