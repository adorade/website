/*!
 * Adorade (v2.2.0): tools/tasks/fonts.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, isProd, del, size, bs, fancyLog, green, magenta, paths, opts } from '../utils/index.mjs';

const taskTarget = isProd ? paths.fonts.css.prod : paths.fonts.css.dev;

export async function cleanFonts () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all fonts')} in ${magenta(taskTarget)} folder`);
}
cleanFonts.displayName = 'clean:fonts';
cleanFonts.description = 'Clean up fonts folders';

export function fontsCss () {
  fancyLog(`${green('-> Copying css font files...')}`);
  return src(paths.fonts.css.src, {
    since: lastRun(fontsCss)
  })
    .pipe(size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.css' }));
}
fontsCss.displayName = 'fonts:css';
fontsCss.description = 'Copy css font files';

export function fontsSvg () {
  fancyLog(`${green('-> Copying svg font files...')}`);
  return src(paths.fonts.svg.src, {
    since: lastRun(fontsSvg)
  })
    .pipe(size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.html' }));
}
fontsSvg.displayName = 'fonts:svg';
fontsSvg.description = 'Copy svg font files';
