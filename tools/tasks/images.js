/*!
 * Adorade (v1.0.0): tools/tasks/images.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, $, bs, magenta, paths, opts } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanImages() {
  $.fancyLog(`Clean all images in ${magenta(paths.images.dest)} folder`);
  return $.del(paths.images.dest);
}
cleanImages.dispalyName = 'clean:images';
cleanImages.description = '';

export function imagine() {
  return src(paths.images.src, {
    since: lastRun(imagine)
  })
    .pipe($.imagemin([
      $.imagemin.gifsicle(opts.images.gif),
      $.imagemin.jpegtran(opts.images.jpeg),
      $.imagemin.optipng(opts.images.png),
      $.imagemin.svgo(opts.images.svg)
    ], { verbose: true }))
    .pipe(dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
}
imagine.dispalyName = 'imagine';
imagine.description = '';

export function convert() {
  return src(paths.images.webp, {
    since: lastRun(convert)
  })
    .pipe($.webp(opts.images.webp))
    .pipe($.size(opts.size))
    .pipe(dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{webp}' }));
}
convert.dispalyName = 'convert';
convert.description = '';

