/*!
 * Adorade (v1.0.0): tools/tasks/statics.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, $, bs, magenta, green, paths, opts } from '../util';

const taskTarget = args.production ? paths.statics.prod : paths.statics.dev;

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanStatics() {
  $.fancyLog(`-> Clean all statics in ${magenta(taskTarget)} folder`);
  return $.del(taskTarget);
}
cleanStatics.displayName = 'clean:statics';
cleanStatics.description = 'Clean up statics folders';

export function statica() {
  $.fancyLog(`${green('-> Copying statics files...')}`);
  return src(paths.statics.src, {
    since: lastRun(statica)
  })
    .pipe($.size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{ico,png,svg,xml,json,webmanifest}' }));
}
statica.displayName = 'statica';
statica.description = 'Copy statics files';
