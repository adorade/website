/*!
 * Adorade (v1.0.0): tools/tasks/help.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { title, fancyLog,  cyan, green, magenta } from '../utils/index.mjs';

export function help (done) {
  fancyLog('');
  fancyLog(green(`========================= Help for ${title} =========================`));
  fancyLog('');
  fancyLog(green('  Usage: gulp <task> <task>... [flags]'));
  fancyLog('');
  fancyLog(`  The gulp ${cyan('<task>')}s are the following:`);
  fancyLog('--------------------------------------------------------------------');
  fancyLog(`${cyan('  help          ')}  Print help message`);
  fancyLog(`${cyan('  check:settings')}  Check gulp configuration`);
  fancyLog(`${cyan('  clean:all     ')}  Clean up dist folders`);
  fancyLog(`${cyan('  build:styles  ')}  Build only styles files`);
  fancyLog(`${cyan('  build:scripts ')}  Build only scripts files`);
  fancyLog(`${cyan('  build:images  ')}  Build only images files`);
  fancyLog(`${cyan('  build:statics ')}  Build statics files`);
  fancyLog(`${cyan('  build:fonts   ')}  Build fonts files`);
  fancyLog(`${cyan('  build:pages   ')}  Build only html files`);
  fancyLog(`${cyan('  build:sw      ')}  Build only Service Worker`);
  fancyLog(`${cyan('  build:deploy  ')}  Deploy to GitHub Pages`);
  fancyLog(`${cyan('  serve:watch   ')}  Start the server and watch for any changes`);
  fancyLog(`${cyan('  build         ')}  Build task for production`);
  fancyLog(`${cyan('  default       ')}  Default gulp task`);
  fancyLog('--------------------------------------------------------------------');
  fancyLog(`  Run ${cyan('`gulp -T`')} to see all available gulp tasks.`);
  fancyLog('');
  fancyLog(`  The ${magenta('[flag]')}s for build task are the following:`);
  fancyLog('--------------------------------------------------------------------');
  fancyLog(`${magenta('  `--clean`     ')}  Clean up all generated files`);
  fancyLog(`${magenta('  `--production`')}  Build in production mode`);
  fancyLog('');
  fancyLog(green('===================================================================='));
  fancyLog('');

  done();
}
help.displayName = 'help';
help.description = 'Print help message';
