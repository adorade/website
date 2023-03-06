/*!
 * Adorade (v1.1.0): tools/tasks/serve.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, del, fancyLog, green, magenta, dirs, opts } from '../utils/index.mjs';
import ghPages from 'gulp-gh-pages';

export async function cleanDeploy () {
  await del(dirs.deploy);
  fancyLog(`${green('-> Clean up')} ${magenta(dirs.deploy)} folder`);
}
cleanDeploy.displayName = 'clean:deploy';
cleanDeploy.description = 'Clean up deploy folder';

export function deploy () {
  fancyLog(`${green('-> Deploy to GitHub Pages...')}`);
  return src(`${dirs.prod}/**/*`)
    .pipe(ghPages(opts.deploy));
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy to GitHub Pages';
