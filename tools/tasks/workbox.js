/*!
 * Adorade (v1.0.0): tools/tasks/workbox.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { args, $, cyan, green, dirs } from '../util';

// NOTE: This should be run *AFTER* all your assets are built
export async function serviceWorker (done) {
  if (args.production) {
    $.fancyLog(`${green('-> Precache files with workbox...')}`);
    await $.workboxBuild.injectManifest({
      swSrc: 'tools/workbox/service-worker.js',
      swDest: `${dirs.prod}/sw.js`,
      globDirectory: dirs.prod,
      globPatterns: [
        '**/*.{js,html}'
      ],
      globIgnores: [
        // 'sw.js',
        'thanks/*.html'
      ]
    }).then(({count, size, warnings}) => {
      // In case there are any warnings from workbox-build, log them.
      warnings.forEach($.fancyLog.warn);
      $.fancyLog(`${cyan(count)} files will be precached, totaling ${cyan(size)} bytes.`);
      // $.fancyLog.info('Service worker generation completed.');
    }).catch((error) => {
      $.fancyLog.warn('Service worker generation failed:', error);
    });
  } else {
    $.fancyLog(`${green('-> No service worker...')}`);
  }

  done();
}
serviceWorker.displayName = 'gen:sw';
serviceWorker.description = 'Precache files with workbox';
