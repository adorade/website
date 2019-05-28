/*!
 * Adorade (v1.0.0): tools/tasks/serve.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, watch, $, bs, http2, magenta, green, red, bgBlue, bgRed, paths, opts, dirs } from '../util';
import {
  lintStyles, compile, lintScripts, transpile,
  imagine, convert, statica, lintPages, pagile
} from './';

export function serve() {
  bs.init({
    server: {
      baseDir: dirs.dest
    },
    port: 6969,
    logPrefix: 'Adorade',
    ui: false,
    httpModule: http2
  });

  function watchEvent(path, event, task) {
    $.fancyLog(
      `File ${magenta(path)} was ${green(event)} running ${red(task)}`
    );
  }

  const watchers = [
    {
      name: 'Styles',
      paths: paths.styles.src,
      tasks: [lintStyles, compile]
    },
    {
      name: 'Scripts',
      paths: paths.scripts.src,
      tasks: [lintScripts, transpile]
    },
    {
      name: 'Images',
      paths: paths.images.src,
      tasks: [imagine, convert]
    },
    {
      name: 'Statics',
      paths: paths.statics.src,
      tasks: [statica]
    },
    {
      name: 'Pages',
      paths: [
        paths.views.all,
        paths.views.data,
        paths.styles.dest + 'style.min.css',
        paths.scripts.dest + 'script.min.js'
      ],
      tasks: [lintPages, pagile]
    }
  ];

  for (let watcher of watchers) {
    $.fancyLog(bgRed(`Watching ${watcher.name}`));

    for (let p of [watcher.paths]) {
      $.fancyLog(bgBlue('Source: '), magenta(p));
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
serve.description = '';
