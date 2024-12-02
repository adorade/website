/*!
 * Adorade (v2.2.0): tools/tasks/styles.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, isProd, del, size, bs, fancyLog, green, magenta,
  header, rename, paths, opts, banner
} from '../utils/index.mjs';
import gStylelintEsm from 'gulp-stylelint-esm';
import * as embeddedSass from 'sass-embedded';
import gulpSass from 'gulp-sass';
const gSass = gulpSass(embeddedSass);
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';

const taskTarget = isProd ? paths.styles.prod : paths.styles.dev;

export async function cleanCss () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all styles')} in ${magenta(taskTarget)} folder`);
}
cleanCss.displayName = 'clean:css';
cleanCss.description = 'Clean up styles folders';

export function lintScss () {
  fancyLog(`${green('-> Linting SCSS files...')}`);
  return src(paths.styles.src, {
    since: lastRun(lintScss)
  })
    .pipe(gStylelintEsm(opts.styles));
}
lintScss.displayName = 'lint:scss';
lintScss.description = 'Lint SCSS files';

export function compile () {
  fancyLog(`${green('-> Compiling SCSS...')}`);
  return src(paths.styles.src, {
    sourcemaps: true
  })
    .pipe(gSass(opts.sass).on('error', gSass.logError))
    .pipe(autoprefixer(opts.autoprefixer))
    .pipe(header(banner()))
    .pipe(size(opts.size))
    .pipe(dest(paths.styles.dev, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.css' }));
}
compile.displayName = 'compile:scss';
compile.description = 'Compile SCSS files';

export function minifyCss (done) {
  if (isProd) {
    fancyLog(`${green('-> Minify CSS...')}`);
    return src(paths.styles.filter, {
      // since: lastRun(minifyCss)
    })
      .pipe(csso(opts.csso))
      // .pipe(cached('min_css'))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(size(opts.size))
      .pipe(dest(paths.styles.prod))
      .pipe(bs.stream({ match: '**/*.min.css' }));
  } else {
    fancyLog(`${green('-> No minify CSS...')}`);
  }

  done();
}
minifyCss.displayName = 'min:css';
minifyCss.description = 'Minify CSS files';
