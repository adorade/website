/*!
 * Adorade (v2.1.0): tools/tasks/serve.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, watch, isProd, bs, fancyLog, bgBlue, bgRed, green, magenta, red, dirs, paths, opts } from '../utils/index.mjs';
import {
  vendorCss, lintScss, compile, minifyCss,
  vendorJs, lintMjs, transpile, minifyJs,
  imagine, convert, favicons, statica, fontsCss, fontsSvg,
  lintPages, pagile, pagify
} from './index.mjs';

export function serve () {
  bs.init({
    server: {
      baseDir: isProd ? dirs.prod : dirs.dev
    },
    port: isProd ? 6969 : 6970,
    logPrefix: isProd ? 'Adorade Prod' : 'Adorade Dev',
    ui: false
  });

  function watchEvent (path, event, task) {
    fancyLog(
      `File ${magenta(path)} was ${green(event)} running ${red(task)}`
    );
  }

  const watchers = [
    {
      name: 'Vendor CSS',
      paths: paths.vendors.watch.css,
      tasks: [vendorCss]
    },
    {
      name: 'Styles',
      paths: paths.styles.src,
      tasks: isProd ? [lintScss, compile, minifyCss] : [lintScss, compile]
    },
    {
      name: 'Vendor JS',
      paths: paths.vendors.watch.js,
      tasks: [vendorJs]
    },
    {
      name: 'Scripts',
      paths: paths.scripts.src,
      tasks: isProd ? [lintMjs, transpile, minifyJs] : [lintMjs, transpile]
    },
    {
      name: 'Fonts',
      paths: paths.fonts.css.src,
      tasks: [fontsCss]
    },
    {
      name: 'SVGs',
      paths: paths.fonts.svg.src,
      tasks: [fontsSvg]
    },
    {
      name: 'Images',
      paths: paths.images.src,
      tasks: [imagine, convert]
    },
    {
      name: 'Favicons',
      paths: paths.statics.src.icons,
      tasks: [favicons]
    },
    {
      name: 'Statics',
      paths: paths.statics.src.conf,
      tasks: [statica]
    },
    {
      name: 'Pages',
      paths: [
        paths.views.all,
        paths.views.data
      ],
      tasks: isProd ? [lintPages, pagile, pagify] : [lintPages, pagile]
    },
    {
      name: 'Inline CSS',
      paths: [
        `${paths.styles.prod}**/*.css`,
        `${paths.fonts.css.prod}**/*.css`
      ],
      tasks: [pagify]
    }
  ];

  if (!isProd) {
    watchers.pop();
  }

  for (let watcher of watchers) {
    fancyLog(bgRed(` Watching: ${watcher.name} `));

    for (let p of [watcher.paths]) {
      fancyLog(bgBlue(' Source: '), magenta(p));
    }

    let taskNames = [];

    for (let value of Object.values(watcher.tasks)) {
      let taskName = value.displayName;
      taskNames.push(taskName);
    }

    watch(
      watcher.paths, opts.watch, series(watcher.tasks)
    )
      .on('all', (event, path) => {
        watchEvent(path, event, taskNames);
      });
  }
}
serve.displayName = 'serve:watch';
serve.description = 'Serve and Watch';
