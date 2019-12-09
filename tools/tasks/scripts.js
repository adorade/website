/*!
 * Adorade (v1.0.0): tools/tasks/scripts.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, args, $, bs, fs, magenta, green,
  paths, opts, banner, inputOpts, outputOpts
} from '../util';

import gulpRollup from '../rollup';

const taskTarget = args.production ? paths.scripts.prod : paths.scripts.dev;
const vendorTarget = args.production ? paths.vendor.prod.js : paths.vendor.dev.js;

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanJs () {
  $.fancyLog(`${green('-> Clean all scripts')} in ${magenta(taskTarget)} folder`);
  return $.del(taskTarget);
}
cleanJs.displayName = 'clean:js';
cleanJs.description = 'Clean up scripts folders';

export function vendorJs () {
  $.fancyLog(`${green('-> Copying vendor JS files...')}`);
  return src(paths.vendor.src.js, {
    // since: lastRun(vendorJs)
  })
    .pipe($.concat('main.js'))
    .pipe($.size(opts.size))
    .pipe(dest(vendorTarget))
    .pipe(bs.stream({ match: '**/*.js' }));
}
vendorJs.displayName = 'vendor:js';
vendorJs.description = 'Copy vendor JS files';

export function lintMjs () {
  $.fancyLog(`${green('-> Linting MJS files...')}`);

  const outputDir = paths.logs.gulp;
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return src(paths.scripts.src, {
    since: lastRun(lintMjs)
  })
    .pipe($.gEslint())
    .pipe($.gEslint.format())
    .pipe($.gEslint.format('stylish', output))
    .pipe($.gEslint.failAfterError());
}
lintMjs.displayName = 'lint:mjs';
lintMjs.description = 'Lint MJS files';

export function transpile () {
  $.fancyLog(`${green('-> Transpiling MJS via Babel...')}`);
  return src(paths.scripts.input, {
    sourcemaps: true
  })
    .pipe(gulpRollup(inputOpts, outputOpts))
    .pipe($.header(banner()))
    .pipe($.size(opts.size))
    .pipe(dest(paths.scripts.dev, { sourcemaps: './' }))
    .pipe(bs.stream({ match: '**/*.js' }));
}
transpile.displayName = 'transpile:mjs';
transpile.description = 'Transpile MJS via Babel';

export function uglify (done) {
  if (args.production) {
    $.fancyLog(`${green('-> Minify JS...')}`);
    return src(paths.scripts.filter, {
      // since: lastRun(uglify)
    })
      .pipe($.uglify(opts.uglify))
      // .pipe($.cached('min_js'))
      .pipe($.rename({ extname: '.min.js' }))
      .pipe($.size(opts.size))
      .pipe(dest(paths.scripts.prod))
      .pipe(bs.stream({ match: '**/*.min.js' }));
  } else {
    $.fancyLog(`${green('-> No minify JS...')}`);
  }

  done();
}
uglify.displayName = 'min:js';
uglify.description = 'Minify JS files';
