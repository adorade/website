/*!
 * Adorade (v1.0.0): tools/tasks/serve.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  series, watch, args, $, bs, bgBlue, bgRed, green, magenta, red, paths, opts, dirs
} from '../util';
import {
  vendorCss, lintScss, compile, minify,
  vendorJs, lintMjs, transpile, uglify,
  imagine, convert, favicons, statica, fontsCss, fontsSvg,
  lintPages, pagile, pagify
} from './';

export function serve () {
  bs.init({
    server: {
      baseDir: args.production ? dirs.prod : dirs.dev
    },
    port: args.production ? 6969 : 6970,
    logPrefix: args.production ? 'Adorade Prod' : 'Adorade Dev',
    ui: false
  });

  function watchEvent (path, event, task) {
    $.fancyLog(
      `File ${magenta(path)} was ${green(event)} running ${red(task)}`
    );
  }

  const watchers = [
    {
      name: 'Vendor CSS',
      paths: paths.vendor.watch.css,
      tasks: [vendorCss]
    },
    {
      name: 'Styles',
      paths: paths.styles.src,
      tasks: [lintScss, compile, minify]
    },
    {
      name: 'Vendor JS',
      paths: paths.vendor.watch.js,
      tasks: [vendorJs]
    },
    {
      name: 'Scripts',
      paths: paths.scripts.src,
      tasks: [lintMjs, transpile, uglify]
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
      tasks: [lintPages, pagile, pagify]
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

  if (!args.production) {
    watchers.pop();
  }

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
serve.description = 'Serve and Watch';
