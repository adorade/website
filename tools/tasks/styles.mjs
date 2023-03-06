/*!
 * Adorade (v2.1.0): tools/tasks/styles.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, isProd, del, size, bs, fancyLog, green, magenta,
  concat, header, rename, paths, opts, banner
} from '../utils/index.mjs';
import gStylelint from 'gulp-stylelint';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const gSass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';

const taskTarget = isProd ? paths.styles.prod : paths.styles.dev;

export async function cleanCss () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all styles')} in ${magenta(taskTarget)} folder`);
}
cleanCss.displayName = 'clean:css';
cleanCss.description = 'Clean up styles folders';

export function vendorCss () {
  fancyLog(`${green('-> Copying vendor CSS files...')}`);
  return src(paths.vendors.src.css, {
    since: lastRun(vendorCss)
  })
    .pipe(concat('vendors.min.css'))
    .pipe(size(opts.size))
    .pipe(dest(paths.vendors.dest.css))
    .pipe(bs.stream({ match: '**/*.css' }));
}
vendorCss.displayName = 'vendor:css';
vendorCss.description = 'Copy vendor CSS files';

export function lintScss () {
  fancyLog(`${green('-> Linting SCSS files...')}`);
  return src(paths.styles.src, {
    since: lastRun(lintScss)
  })
    .pipe(gStylelint(opts.styles));
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
