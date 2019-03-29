/*!
 * Adorade (v1.0.0): gulpfile.js
 * Copyright (c) 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ============================================================================
 */
'use strict';

// Require gulp v4
const { src, dest, task, series, parallel, lastRun, watch, tree } = require('gulp');

// Load all plugins in "devDependencies" into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  rename: {
    'gulp-stylelint': 'gStylelint',
    'gulp-eslint': 'gEslint',
    'gulp-pug-linter': 'pugLinter',
    'gulp-gh-pages': 'ghPages'
  }
});

const { bgBlue, bgRed, green, magenta, red } = require('ansi-colors');
const bs = require('browser-sync').create();
const fs = require('fs');
const http2 = require('http2');

// For debugging usage: .pipe($.debug({ title: 'unicorn:' }))

/**
 * ----------------------------------------------------------------------------
 * Dirs and Paths
 * ----------------------------------------------------------------------------
 */
const { dirs, paths } = require('./.tools/config');

/**
 * ----------------------------------------------------------------------------
 * Options and Settings
 * ----------------------------------------------------------------------------
 */
const { opts } = require('./.tools/options');

/**
 * ----------------------------------------------------------------------------
 * Template for banner to add to file headers
 * ----------------------------------------------------------------------------
 */
const banner = require('./.tools/banner');

/**
 * ----------------------------------------------------------------------------
 * Clean - clean all files from 'dist' folder
 * ----------------------------------------------------------------------------
 */
task('clean', () => {
  $.fancyLog(`${green('Clean all files')} in ${magenta(dirs.dest)} folder`);
  return $.del(dirs.dest);
});

/**
 * ----------------------------------------------------------------------------
 * Styles - processes style files
 * ----------------------------------------------------------------------------
 */
task('clean:styles', () => {
  $.fancyLog(`Clean all styles in ${magenta(paths.styles.dest)} folder`);
  return $.del(paths.styles.dest);
});
task('vendor:styles', () => {
  return src(paths.vendor.src.css, {
    since: lastRun('vendor:styles')
  })
    .pipe(dest(paths.vendor.dest.css))
    .pipe(bs.stream({ match: '**/*.min.css' }));
});
task('lint:styles', () => {
  return src(paths.styles.src, {
    since: lastRun('lint:styles')
  })
    .pipe($.gStylelint(opts.styles));
});
task('compile', () => {
  return src(paths.styles.src, {
    sourcemaps: true
  })
    // Compile
    .pipe($.sass(opts.sass).on('error', $.sass.logError))
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.css' }))

    // Minify
    .pipe($.filter(paths.styles.filter))
    .pipe($.csso(opts.csso))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream({ match: '**/*.min.css' }));
});
task('styles', parallel(
  'vendor:styles',
  series('lint:styles', 'compile')
));
task('build:styles', series('clean:styles', 'styles'));

/**
 * ----------------------------------------------------------------------------
 * Scripts - processes script files
 * ----------------------------------------------------------------------------
 */
task('clean:scripts', () => {
  $.fancyLog(`Clean all scripts in ${magenta(paths.scripts.dest)} folder`);
  return $.del(paths.scripts.dest);
});
task('vendor:scripts', () => {
  return src(paths.vendor.src.js, {
    since: lastRun('vendor:scripts')
  })
    .pipe(dest(paths.vendor.dest.js))
    .pipe(bs.stream({ match: '**/*.min.js' }));
});
task('lint:scripts', () => {
  const outputDir = paths.logs.gulp;
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return src(paths.scripts.src, {
    since: lastRun('lint:scripts')
  })
    .pipe($.gEslint())
    .pipe($.gEslint.format())
    .pipe($.gEslint.format('stylish', output))
    .pipe($.gEslint.failAfterError());
});
task('transpile', () => {
  return src(paths.scripts.src, {
    sourcemaps: true,
    since: lastRun('transpile')
  })
    // Transpile
    .pipe($.babel(opts.babel))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.js' }))

    // Minify
    .pipe($.filter(paths.scripts.filter))
    .pipe($.uglify(opts.uglify))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.header(banner()))
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream({ match: '**/*.min.js' }));
});
task('scripts', parallel(
  'vendor:scripts',
  series('lint:scripts', 'transpile')
));
task('build:scripts', series('clean:scripts', 'scripts'));

/**
 * ----------------------------------------------------------------------------
 * Images - processes image files
 * ----------------------------------------------------------------------------
 */
task('clean:images', () => {
  $.fancyLog(`Clean all images in ${magenta(paths.images.dest)} folder`);
  return $.del(paths.images.dest);
});
task('imagine', () => {
  return src(paths.images.src, {
    since: lastRun('imagine')
  })
    .pipe($.imagemin([
      $.imagemin.gifsicle(opts.images.gif),
      $.imagemin.jpegtran(opts.images.jpeg),
      $.imagemin.optipng(opts.images.png),
      $.imagemin.svgo(opts.images.svg)
    ], { verbose: true }))
    .pipe(dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
});
task('convert', () => {
  return src(paths.images.webp, {
    since: lastRun('convert')
  })
    .pipe($.webp(opts.images.webp))
    .pipe(dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{webp}' }));
});
task('images', series('imagine', 'convert'));
task('build:images', series('clean:images', 'images'));

/**
 * ----------------------------------------------------------------------------
 * Statics - processes static files
 * ----------------------------------------------------------------------------
 */
task('clean:statics', () => {
  $.fancyLog(`Clean all statics in ${magenta(paths.statics.dest)} folder`);
  return $.del(paths.statics.dest);
});
task('statica', () => {
  return src(paths.statics.src, {
    since: lastRun('statica')
  })
    .pipe(dest(paths.statics.dest))
    .pipe(bs.stream({ match: '**/*.{ico,png,svg,xml,json,webmanifest}' }));
});
task('statics', parallel('statica'));
task('build:statics', series('clean:statics', 'statica'));

/**
 * ----------------------------------------------------------------------------
 * Templates - processes templates files
 * ----------------------------------------------------------------------------
 */
task('clean:pages', () => {
  $.fancyLog(`Clean all pages in ${magenta(paths.views.dest)} folder`);
  return $.del(paths.views.del);
});
task('lint:pages', () => {
  return src(paths.views.all, {
    since: lastRun('lint:pages')
  })
    .pipe($.pugLinter())
    .pipe($.pugLinter({ reporter: 'default' }))
    .pipe($.pugLinter({ failAfterError: true }));
});
task('pagile', () => {
  var dataFile = paths.views.datas + 'menu.json';

  return src(paths.views.src)
    .pipe($.data(() => {
      return JSON.parse(fs.readFileSync(dataFile));
    }))
    .pipe($.pug(opts.pug))
    .pipe($.cached('pug_compile'))
    .pipe($.inlineSource(opts.inline))
    .pipe($.htmlmin(opts.html))
    .pipe(dest(paths.views.dest))
    .pipe(bs.stream({ match: '**/*.html' }));
});
task('pages', series('lint:pages', 'pagile'));
task('build:pages', series('clean:pages', 'pages'));

/**
 * ----------------------------------------------------------------------------
 * Deploy to GitHub Pages
 * ----------------------------------------------------------------------------
 */
task('clean:deploy', () => {
  $.fancyLog(`${green('Clean up')} ${magenta(dirs.deploy)} folder`);
  return $.del(dirs.deploy);
});
task('deploy', () => {
  $.fancyLog(`${green('-> Deploy to GitHub Pages...')}`);
  return src(`${dirs.dest}/**/*`)
    .pipe($.ghPages(opts.deploy));
});
task('build:deploy', series('clean:deploy', 'deploy'));

/**
 * ----------------------------------------------------------------------------
 * Watch and Serve - watch files for changes and reload
 * Starts a BrowerSync instance
 * Watch files for changes
 * ----------------------------------------------------------------------------
 */
task('serve', () => {
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
      tasks: ['lint:styles', 'compile']
    },
    {
      name: 'Scripts',
      paths: paths.scripts.src,
      tasks: ['lint:scripts', 'transpile']
    },
    {
      name: 'Images',
      paths: paths.images.src,
      tasks: ['images']
    },
    {
      name: 'Statics',
      paths: paths.statics.src,
      tasks: ['statics']
    },
    {
      name: 'Pages',
      paths: [
        paths.views.all,
        paths.views.data,
        paths.styles.dest + 'style.min.css',
        paths.scripts.dest + 'script.min.js'
      ],
      tasks: ['pages']
    }
  ];

  for (let watcher of watchers) {
    $.fancyLog(bgRed(`Watching ${watcher.name}`));

    for (let p of [watcher.paths]) {
      $.fancyLog(bgBlue('Source: '), magenta(p));
    }

    watch(
      watcher.paths, opts.watch, series(watcher.tasks)
    )
      .on('all', (event, path) => {
        watchEvent(path, event, watcher.tasks);
      });
  }
});

/**
 * ----------------------------------------------------------------------------
 * Define `build` task - Specify if tasks run in series or parallel
 * Builds the documentation and framework files
 * ----------------------------------------------------------------------------
 */
task('build', series(
  'clean', 'styles', 'scripts', 'images', 'statics', 'pages'
));

/**
 * ----------------------------------------------------------------------------
 * Define `dev` task - build, edit source, reload
 * Runs all of the above tasks and then waits for files to change
 * ----------------------------------------------------------------------------
 */
task('dev', series('build', 'serve'));

/**
 * ----------------------------------------------------------------------------
 * Define default task that can be called by just running `gulp` from cli
 * ----------------------------------------------------------------------------
 */
task('default', parallel('dev'));

/**
 * ----------------------------------------------------------------------------
 * Check dirs, paths, options and settings
 * ----------------------------------------------------------------------------
 */
task('checks', (done) => {
  const gulpTree = tree();
  $.fancyLog(`${green('Gulp Tasks:\n')}`, gulpTree.nodes);
  $.fancyLog(`${magenta('Directories configuration:\n')}`, dirs);
  $.fancyLog(`${magenta('Paths configuration:\n')}`, paths);
  $.fancyLog(`${magenta('Options configuration:\n')}`, opts);
  done();
});
