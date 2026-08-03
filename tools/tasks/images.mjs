/*!
 * Build Tools (3.0.0): tools/tasks/images.mjs
 * Copyright (c) 2018-26 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

import { src, dest, lastRun, isProd, del, size, bs, fancyLog, green, magenta, paths, opts } from '../utils/index.mjs';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

const taskTarget = isProd ? paths.images.prod : paths.images.dev;

export async function cleanImages () {
  await del(taskTarget);
  fancyLog(`${green('-> Clean all images')} in ${magenta(taskTarget)} folder`);
}
cleanImages.displayName = 'clean:images';
cleanImages.description = 'Clean up images folder';

export function imagine () {
  fancyLog(`${green('-> Optimizing images...')}`);
  return src(paths.images.src, {
    since: lastRun(imagine),
    encoding: false
  })
    .pipe(imagemin([
      gifsicle(opts.images.gif),
      mozjpeg(opts.images.jpeg),
      optipng(opts.images.png),
      svgo(opts.images.svg)
    ], opts.images.general))
    .pipe(size(opts.size))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
}
imagine.displayName = 'optimize:img';
imagine.description = 'Optimize images for production';

export function convert () {
  fancyLog(`${green('-> Generating modern image formats...')}`);

  // Generate WebP
  const webpStream = src(paths.images.webp, {
    since: lastRun(convert),
    encoding: false
  })
    .pipe(webp(opts.images.webp))
    .pipe(size(opts.size))
    .pipe(dest(taskTarget));

  // Generate AVIF only in production (better compression but takes longer)
  if (isProd) {
    const avifStream = src(paths.images.webp, {
      since: lastRun(convert),
      encoding: false
    })
      .pipe(avif(opts.images.avif))
      .pipe(size(opts.size))
      .pipe(dest(taskTarget));

    // Return combined streams
    return Promise.all([
      new Promise((resolve, reject) => {
        webpStream.on('end', resolve).on('error', reject);
      }),
      new Promise((resolve, reject) => {
        avifStream.on('end', resolve).on('error', reject);
      })
    ]);
  }

  return webpStream.pipe(bs.stream({ match: '**/*.{webp}' }));
}
convert.displayName = 'convert:img';
convert.description = 'Convert images to modern formats for better performance';
