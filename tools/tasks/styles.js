/*!
 * Adorade (v1.0.0): tools/tasks/styles.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, magenta, paths, opts, banner } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanStyles() {
  $.fancyLog(`Clean all styles in ${magenta(paths.styles.dest)} folder`);
  return $.del(paths.styles.dest);
}
cleanStyles.displayName = 'clean:styles';
cleanStyles.description = '';

export function vendorStyles() {
  return src(paths.vendor.src.css, {
    since: lastRun(vendorStyles)
  })
    .pipe(dest(paths.vendor.dest.css))
    .pipe(bs.stream({ match: '**/*.min.css' }));
}
vendorStyles.displayName = 'vendor:styles';
vendorStyles.description = '';

export function lintStyles() {
  return src(paths.styles.src, {
    since: lastRun(lintStyles)
  })
    .pipe($.gStylelint(opts.styles));
}
lintStyles.displayName = 'lint:styles';
lintStyles.description = '';

export function compile() {
  return src(paths.styles.src, {
    sourcemaps: true
  })
    // Compile
    .pipe($.sass(opts.sass).on('error', $.sass.logError))
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.css' }))

    // Minify
    .pipe($.filter(paths.styles.filter))
    .pipe($.csso(opts.csso))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream({ match: '**/*.min.css' }));
}
compile.displayName = 'compile';
compile.description = '';
