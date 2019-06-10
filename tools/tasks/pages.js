/*!
 * Adorade (v1.0.0): tools/tasks/pages.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, $, bs, fs, magenta, green, paths, opts } from '../util';

const taskTarget = args.production ? paths.views.files.prod : paths.views.files.dev;
const entry = opts.entry;

if (args.production) {
  entry.inline = true;
}

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanPages () {
  $.fancyLog(`-> Clean all pages in ${magenta(taskTarget)} folder`);
  return $.del(taskTarget);
}
cleanPages.displayName = 'clean:pages';
cleanPages.description = 'Clean up html files';

export function lintPages () {
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

export function pagile () {
  $.fancyLog(`${green('-> Generating Pages via Pug...')}`);

  const dataFile = paths.views.datas + 'menu.json';

  return src(paths.views.src)
    .pipe($.data(() => {
      return JSON.parse(fs.readFileSync(dataFile));
    }))
    // .pipe($.pug(opts.pug))
    .pipe($.pug({
      doctype: 'html',
      pretty: true,
      locals: {
        entry
      }
    }))
    .pipe($.cached('pug_compile'))
    .pipe($.inlineSource(opts.inline))
    .pipe($.size(opts.size))
    .pipe(dest(paths.views.dev))
    .pipe(bs.stream({ match: '**/*.html' }));
}
pagile.displayName = 'gen:pages';
pagile.description = 'Generate Pages via Pug';

export function pagify (done) {
  if (args.production) {
    $.fancyLog(`${green('-> Minify HTML...')}`);
    return src(paths.views.files.dev, {
      // since: lastRun(pagify)
    })
      .pipe($.inlineSource(opts.inline))
      .pipe($.htmlmin(opts.html))
      // .pipe($.cached('html_min'))
      .pipe($.size(opts.size))
      .pipe(dest(paths.views.prod))
      .pipe(bs.stream({ match: '**/*.html' }));
  } else {
    $.fancyLog(`${green('-> No minify HTML...')}`);
    done();
  }
}
pagify.displayName = 'html:min';
pagify.description = 'Minify HTML files';
