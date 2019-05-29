/*!
 * Adorade (v1.0.0): tools/tasks/pages.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, fs, magenta, paths, opts } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanPages() {
  $.fancyLog(`Clean all pages in ${magenta(paths.views.dest)} folder`);
  return $.del(paths.views.del);
}
cleanPages.displayName = 'clean:pages';
cleanPages.description = '';

export function lintPages() {
  return src(paths.views.all, {
    since: lastRun(lintPages)
  })
    .pipe($.pugLinter())
    .pipe($.pugLinter({ reporter: 'default' }))
    .pipe($.pugLinter({ failAfterError: true }));
}
lintPages.displayName = 'lint:pages';
lintPages.description = '';

export function pagile() {
  var dataFile = paths.views.datas + 'menu.json';

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
pagile.displayName = 'pagile';
pagile.description = '';
