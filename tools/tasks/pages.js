/*!
 * Adorade (v1.0.0): tools/tasks/pages.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, fs, magenta, green, paths, opts } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanPages() {
  $.fancyLog(`-> Clean all pages in ${magenta(paths.views.dest)} folder`);
  return $.del(paths.views.del);
}
cleanPages.displayName = 'clean:pages';
cleanPages.description = 'Clean up html files';

export function lintPages() {
  $.fancyLog(`${green('-> Linting templates...')}`);
  return src(paths.views.all, {
    since: lastRun(lintPages)
  })
    .pipe($.pugLinter())
    .pipe($.pugLinter({ reporter: 'default' }))
    .pipe($.pugLinter({ failAfterError: true }));
}
lintPages.displayName = 'lint:pages';
lintPages.description = 'Lint pug (views) files';

export function pagile() {
  $.fancyLog(`${green('-> Generating Pages via Pug...')}`);

  const dataFile = paths.views.datas + 'menu.json';

  return src(paths.views.src)
    .pipe($.data(() => {
      return JSON.parse(fs.readFileSync(dataFile));
    }))
    .pipe($.pug(opts.pug))
    .pipe($.cached('pug_compile'))
    .pipe($.inlineSource(opts.inline))
    .pipe($.htmlmin(opts.html))
    .pipe($.size(opts.size))
    .pipe(dest(paths.views.dest))
    .pipe(bs.stream({ match: '**/*.html' }));
}
pagile.displayName = 'gen:pages';
pagile.description = 'Generate Pages via Pug';
