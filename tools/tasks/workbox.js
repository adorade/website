/*!
 * Adorade (v1.0.0): tools/tasks/workbox.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { args, $, bgRed, cyan, green, magenta, dirs } from '../util';

export function cleanSW (done) {
  if (args.production) {
    $.fancyLog(`${green('-> Clean up service worker')} ${magenta(`${dirs.prod}/sw.js`)}`);
    return $.del(`${dirs.prod}/sw.js`);
  } else {
    $.fancyLog(`${green('-> No service worker to clean...')}`);
    done();
  }
}
cleanSW.displayName = 'clean:sw';
cleanSW.description = 'Clean up service-worker';

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
      $.fancyLog(`${bgRed('Service worker generation failed:')} ${error.stack}`);
    });
  } else {
    $.fancyLog(`${green('-> No service worker to generate...')}`);
    done();
  }
}
serviceWorker.displayName = 'gen:sw';
serviceWorker.description = 'Precache files with workbox';
