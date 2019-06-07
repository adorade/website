/*!
 * Adorade (v1.0.0): tools/tasks/serve.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, $, magenta, green, dirs, opts } from '../util';

// For debugging usage:
// .pipe($.debug({ title: 'unicorn:' }))

export function cleanDeploy() {
  $.fancyLog(`${green('-> Clean up')} ${magenta(dirs.deploy)} folder`);
  return $.del(dirs.deploy);
}
cleanDeploy.displayName = 'clean:deploy';
cleanDeploy.description = 'Clean up deploy folder';

export function deploy() {
  $.fancyLog(`${green('-> Deploy to GitHub Pages...')}`);
  return src(`${dirs.prod}/**/*`)
    .pipe($.ghPages(opts.deploy));
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy to GitHub Pages';
