/*!
 * Adorade (v1.0.0): tools/tasks/pages.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, isProd, fs, del, size, bs,
  fancyLog, green, magenta, cached, paths, opts
} from '../utils/index.js';
import pugLinter from 'gulp-pug-linter';
import data from 'gulp-data';
import pug from 'gulp-pug';
import inlineSource from 'gulp-inline-source-html';
import htmlmin from 'gulp-htmlmin';

const taskTarget = isProd ? paths.views.files.prod : paths.views.files.dev;
const entry = opts.entry;

if (isProd) {
  entry.inline = true;
}

export async function cleanPages () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all pages')} in ${magenta(taskTarget)} folder`);
}
cleanPages.displayName = 'clean:pages';
cleanPages.description = 'Clean up html files';

export function lintPages () {
  fancyLog(`${green('-> Linting templates...')}`);
  return src(paths.views.all, {
    since: lastRun(lintPages)
  })
    .pipe(pugLinter())
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pugLinter({ failAfterError: true }));
}
lintPages.displayName = 'lint:pages';
lintPages.description = 'Lint pug (views) files';

export function pagile () {
  fancyLog(`${green('-> Generating Pages via Pug...')}`);

  // Data from `menu.json`
  const dataFile = paths.views.datas + 'menu.json';
  const dataJson = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

  // Options for pug
  const locals = { locals: { entry } };
  const pugOpts = Object.assign({}, opts.pug, locals);

  return src(paths.views.src)
    .pipe(data(() => dataJson))
    .pipe(pug(pugOpts))
    .pipe(cached('pug_compile'))
    .pipe(inlineSource(opts.inline))
    .pipe(size(opts.size))
    .pipe(dest(paths.views.dev))
    .pipe(bs.stream({ match: '**/*.html' }));
}
pagile.displayName = 'gen:pages';
pagile.description = 'Generate Pages via Pug';

export function pagify (done) {
  if (isProd) {
    fancyLog(`${green('-> Minify HTML...')}`);
    return src(paths.views.files.dev, {
      // since: lastRun(pagify)
    })
      .pipe(inlineSource(opts.inline))
      .pipe(htmlmin(opts.html))
      // .pipe(cached('html_min'))
      .pipe(size(opts.size))
      .pipe(dest(paths.views.prod))
      .pipe(bs.stream({ match: '**/*.html' }));
  } else {
    fancyLog(`${green('-> No minify HTML...')}`);
    done();
  }
}
pagify.displayName = 'html:min';
pagify.description = 'Minify HTML files';
