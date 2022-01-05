/*!
 * Adorade (v1.0.0): tools/tasks/images.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, del, size, bs, fancyLog, green, magenta, paths, opts } from '../utils/index.js';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp';

const taskTarget = args.production ? paths.images.prod : paths.images.dev;

export async function cleanImages () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all images')} in ${magenta(taskTarget)} folder`);
}
cleanImages.displayName = 'clean:images';
cleanImages.description = 'Clean up images folder';

export function imagine () {
  fancyLog(`${green('-> Optimizing images...')}`);
  return src(paths.images.src, {
    since: lastRun(imagine)
  })
    .pipe(imagemin([
      gifsicle(opts.images.gif),
      mozjpeg(opts.images.jpeg),
      optipng(opts.images.png),
      svgo(opts.images.svg)
    ], opts.images.general ))
    .pipe(size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
}
imagine.displayName = 'optimize:img';
imagine.description = 'Optimize images for production';

export function convert () {
  fancyLog(`${green('-> Generating .webp formats...')}`);
  return src(paths.images.webp, {
    since: lastRun(convert)
  })
    .pipe(webp(opts.images.webp))
    .pipe(size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{webp}' }));
}
convert.displayName = 'convert:img';
convert.description = 'Convert images format for browser';
