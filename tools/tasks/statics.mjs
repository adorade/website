/*!
 * Adorade (v2.1.0): tools/tasks/statics.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, isProd, del, size, bs, fancyLog, green, magenta, dirs, paths, opts } from '../utils/index.mjs';

const taskFavTarget = isProd ? paths.statics.prod : paths.statics.dev;
const taskConfTarget = isProd ? dirs.prod : dirs.dev;

const delConfTarget = `${taskConfTarget}/${paths.statics.ext}`;

export async function cleanStatics () {
  await del([taskFavTarget, delConfTarget]);
  fancyLog(`${green('-> Clean up')} ${magenta(taskFavTarget)} folder`);
  fancyLog(`${green('-> Clean up')} all ${magenta('conf')} files`);
}
cleanStatics.displayName = 'clean:statics';
cleanStatics.description = 'Clean up statics folders';

export function favicons () {
  fancyLog(`${green('-> Copying favicons files...')}`);
  return src(paths.statics.src.icons, {
    since: lastRun(favicons),
    encoding: false
  })
    .pipe(size(opts.size))
    .pipe(dest(taskFavTarget))
    .pipe(bs.stream({ match: '**/*.{ico,png,svg}' }));
}
favicons.displayName = 'favicons';
favicons.description = 'Copy favicons files';

export function statica () {
  fancyLog(`${green('-> Copying statics files...')}`);
  return src(paths.statics.src.conf, {
    since: lastRun(statica)
  })
    .pipe(size(opts.size))
    .pipe(dest(taskConfTarget))
    .pipe(bs.stream({ match: '**/*.{json,text,webmanifest,xml}' }));
}
statica.displayName = 'statica';
statica.description = 'Copy statics files';
