/*!
 * Adorade (v1.0.0): tools/tasks/fonts.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, $, bs, magenta, green, paths, opts } from '../util';

const taskTarget = args.production ? paths.fonts.css.prod : paths.fonts.css.dev;

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanFonts () {
  $.fancyLog(`${green('-> Clean all fonts')} in ${magenta(taskTarget)} folder`);
  return $.del(taskTarget);
}
cleanFonts.displayName = 'clean:fonts';
cleanFonts.description = 'Clean up fonts folders';

export function fontsCss () {
  $.fancyLog(`${green('-> Copying css font files...')}`);
  return src(paths.fonts.css.src, {
    since: lastRun(fontsCss)
  })
    .pipe($.size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.css' }));
}
fontsCss.displayName = 'fonts:css';
fontsCss.description = 'Copy css font files';

export function fontsSvg () {
  $.fancyLog(`${green('-> Copying svg font files...')}`);
  return src(paths.fonts.svg.src, {
    since: lastRun(fontsSvg)
  })
    .pipe($.size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.html' }));
}
fontsSvg.displayName = 'fonts:svg';
fontsSvg.description = 'Copy svg font files';
