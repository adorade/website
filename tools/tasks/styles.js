/*!
 * Adorade (v1.0.0): tools/tasks/styles.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, magenta, paths, opts, banner } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanCss() {
  $.fancyLog(`Clean all styles in ${magenta(paths.styles.dest)} folder`);
  return $.del(paths.styles.dest);
}
cleanCss.displayName = 'clean:css';
cleanCss.description = '';

export function vendorCss() {
  return src(paths.vendor.src.css, {
    since: lastRun(vendorCss)
  })
    .pipe(dest(paths.vendor.dest.css))
    .pipe(bs.stream({ match: '**/*.min.css' }));
}
vendorCss.displayName = 'vendor:css';
vendorCss.description = '';

export function lintScss() {
  return src(paths.styles.src, {
    since: lastRun(lintScss)
  })
    .pipe($.gStylelint(opts.styles));
}
lintScss.displayName = 'lint:scss';
lintScss.description = '';

export function compile() {
  return src(paths.styles.src, {
    sourcemaps: true
  })
    .pipe($.sass(opts.sass).on('error', $.sass.logError))
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.css' }));
}
compile.displayName = 'compile';
compile.description = '';

export function minify() {
  return src(paths.styles.filter, {
    since: lastRun(minify)
  })
    .pipe($.csso(opts.csso))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream({ match: '**/*.min.css' }));
}
minify.displayName = 'min:css';
minify.description = '';
