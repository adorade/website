/*!
 * Adorade (v1.0.0): tools/tasks/scripts.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, fs, magenta, paths, opts, banner } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanJs() {
  $.fancyLog(`Clean all scripts in ${magenta(paths.scripts.dest)} folder`);
  return $.del(paths.scripts.dest);
}
cleanJs.displayName = 'clean:js';
cleanJs.description = '';

export function vendorJs() {
  return src(paths.vendor.src.js, {
    since: lastRun(vendorJs)
  })
    .pipe(dest(paths.vendor.dest.js))
    .pipe(bs.stream({ match: '**/*.min.js' }));
}
vendorJs.displayName = 'vendor:js';
vendorJs.description = '';

export function lintEs() {
  const outputDir = paths.logs.gulp;
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return src(paths.scripts.src, {
    since: lastRun(lintEs)
  })
    .pipe($.gEslint())
    .pipe($.gEslint.format())
    .pipe($.gEslint.format('stylish', output))
    .pipe($.gEslint.failAfterError());
}
lintEs.displayName = 'lint:es';
lintEs.description = '';

export function transpile() {
  return src(paths.scripts.src, {
    sourcemaps: true,
    since: lastRun(transpile)
  })
    .pipe($.babel(opts.babel))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.js' }));
}
transpile.displayName = 'transpile';
transpile.description = '';

export function uglify() {
  return src(paths.scripts.filter, {
    since: lastRun(uglify)
  })
    .pipe($.uglify(opts.uglify))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream({ match: '**/*.min.js' }));
}
uglify.displayName = 'min:js';
uglify.description = '';
