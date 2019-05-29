/*!
 * Adorade (v1.0.0): tools/tasks/statics.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, magenta, green, paths, opts } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanStatics() {
  $.fancyLog(`-> Clean all statics in ${magenta(paths.statics.dest)} folder`);
  return $.del(paths.statics.dest);
}
cleanStatics.displayName = 'clean:statics';
cleanStatics.description = 'Clean up statics folders';

export function statica() {
  $.fancyLog(`${green('-> Copying statics files...')}`);
  return src(paths.statics.src, {
    since: lastRun(statica)
  })
    .pipe($.size(opts.size))
    .pipe(dest(paths.statics.dest))
    .pipe(bs.stream({ match: '**/*.{ico,png,svg,xml,json,webmanifest}' }));
}
statica.displayName = 'statica';
statica.description = 'Copy statics files';
