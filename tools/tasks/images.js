/*!
 * Adorade (v1.0.0): tools/tasks/images.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, $, bs, magenta, green, paths, opts } from '../util';

const taskTarget = args.production ? paths.images.prod : paths.images.dev;

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanImages() {
  $.fancyLog(`-> Clean all images in ${magenta(taskTarget)} folder`);
  return $.del(taskTarget);
}
cleanImages.displayName = 'clean:images';
cleanImages.description = 'Clean up images folder';

export function imagine() {
  $.fancyLog(`${green('-> Optimizing images...')}`);
  return src(paths.images.src, {
    since: lastRun(imagine)
  })
    .pipe($.imagemin([
      $.imagemin.gifsicle(opts.images.gif),
      $.imagemin.jpegtran(opts.images.jpeg),
      $.imagemin.optipng(opts.images.png),
      $.imagemin.svgo(opts.images.svg)
    ], { verbose: true }))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
}
imagine.displayName = 'optimize:img';
imagine.description = 'Optimize images for production';

export function convert() {
  $.fancyLog(`${green('-> Generating .webp formats...')}`);
  return src(paths.images.webp, {
    since: lastRun(convert)
  })
    .pipe($.webp(opts.images.webp))
    .pipe($.size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{webp}' }));
}
convert.displayName = 'convert:img';
convert.description = 'Convert images format for browser';
