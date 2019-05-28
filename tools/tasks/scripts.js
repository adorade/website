/*!
 * Adorade (v1.0.0): tools/tasks/scripts.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, fs, magenta, paths, opts, banner } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanScripts() {
  $.fancyLog(`Clean all scripts in ${magenta(paths.scripts.dest)} folder`);
  return $.del(paths.scripts.dest);
}
cleanScripts.displayName = 'clean:scripts';
cleanScripts.description = '';

export function vendorScripts() {
  return src(paths.vendor.src.js, {
    since: lastRun(vendorScripts)
  })
    .pipe(dest(paths.vendor.dest.js))
    .pipe(bs.stream({ match: '**/*.min.js' }));
}
vendorScripts.displayName = 'vendor:scripts';
vendorScripts.description = '';

export function lintScripts() {
  const outputDir = paths.logs.gulp;
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return src(paths.scripts.src, {
    since: lastRun(lintScripts)
  })
    .pipe($.gEslint())
    .pipe($.gEslint.format())
    .pipe($.gEslint.format('stylish', output))
    .pipe($.gEslint.failAfterError());
}
lintScripts.displayName = 'lint:scripts';
lintScripts.description = '';

export function transpile() {
  return src(paths.scripts.src, {
    sourcemaps: true,
    since: lastRun(transpile)
  })
    // Transpile
    .pipe($.babel(opts.babel))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.js' }))

    // Minify
    .pipe($.filter(paths.scripts.filter))
    .pipe($.uglify(opts.uglify))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream({ match: '**/*.min.js' }));
}
transpile.displayName = 'transpile';
transpile.description = '';
