/*!
 * Adorade (v1.0.0): tools/tasks/workbox.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { args, $, cyan, green, dirs } from '../util';

const taskTarget = args.production ? dirs.prod : dirs.dev;

// NOTE: This should be run *AFTER* all your assets are built
export async function serviceWorker (done) {
  $.fancyLog(`${green('-> Precache files with workbox...')}`);
  await $.workboxBuild.injectManifest({
    swSrc: `${dirs.src}/workbox/service-worker.js`,
    swDest: `${taskTarget}/sw.js`,
    globDirectory: taskTarget,
    globPatterns: [
      '**/*.{js,css,html}'
    ],
    globIgnores: [
      // 'sw.js',
      'css/vendor/fonts.css',
      'js/vendor/unikorn.umd.js'
    ]
  }).then(({count, size, warnings}) => {
    // In case there are any warnings from workbox-build, log them.
    warnings.forEach($.fancyLog.warn);
    $.fancyLog(`${cyan(count)} files will be precached, totaling ${cyan(size)} bytes.`);
    // $.fancyLog.info('Service worker generation completed.');
  }).catch((error) => {
    $.fancyLog.warn('Service worker generation failed:', error);
  });
  done();
}
serviceWorker.displayName = 'gen:sw';
serviceWorker.description = 'Precache files with workbox';
