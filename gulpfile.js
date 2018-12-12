/*!
 * Adorade - Web Design Company - v1.0.0 - gulpfile.js
 * Copyright (c) 2018 Adorade (https://adorade.ro)
 * Licensed under MIT (https://github.com/adorade/adorade/blob/master/LICENSE)
 * ============================================================================
 */
'use strict';

// Load plugins, require gulp v.4
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cached = require('gulp-cached');
const csso = require('gulp-csso');
const data = require('gulp-data');
const eslint = require('gulp-eslint');
const filter = require('gulp-filter');
const header = require('gulp-header');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inlinesource = require('gulp-inline-source');
const pug = require('gulp-pug');
const puglint = require('gulp-pug-linter');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');

const { bgBlue, bgRed, green, magenta, red } = require('ansi-colors');
const bs = require('browser-sync').create();
const del = require('del');
const fs = require('fs');
const log = require('fancy-log');

const pkg = require('./package.json');

// Usage: debug({ title: 'unicorn:' })
// const debug = require('gulp-debug');

/**
 * ----------------------------------------------------------------------------
 * Dirs and Paths
 * ----------------------------------------------------------------------------
 */
const dirs = {
  root: './',
  src: 'src',
  build: 'build',
  test: 'test',
  dest: 'dist'
};
const paths = {
  styles: {
    src: `${dirs.src}/scss/**/*.scss`,
    dest: `${dirs.dest}/css/`,
    filter: `${dirs.dest}/css/*.css`
  },
  scripts: {
    src: `${dirs.src}/es6/**/*.es6`,
    dest: `${dirs.dest}/js/`,
    filter: `${dirs.dest}/js/*.js`
  },
  vendor: {
    src: {
      css: `${dirs.src}/vendor/css/**/*.css`,
      js: `${dirs.src}/vendor/js/**/*.js`
    },
    dest: {
      css: `${dirs.dest}/css/vendor/`,
      js: `${dirs.dest}/js/vendor/`
    }
  },
  images: {
    src: `${dirs.src}/images/**/*.{gif,jpg,jpeg,png,svg}`,
    webp: `${dirs.src}/images/**/*.{jpg,jpeg,png}`,
    dest: `${dirs.dest}/images/`
  },
  statics: {
    src: `${dirs.src}/statics/**/*.{ico,png,xml,json,svg,webmanifest}`,
    dest: `${dirs.dest}/statics/`
  },
  views: {
    src: [`${dirs.src}/views/**/*.pug`, `!${dirs.src}/views/**/_*.pug`],
    all: `${dirs.src}/views/**/*.pug`,
    data: `${dirs.src}/views/data/**/*.json`,
    datas: `${dirs.src}/views/data/`,
    dest: `${dirs.dest}/`,
    del: `${dirs.dest}/*.html`
  },
  test: {
    js: `${dirs.test}/js/`
  }
};

/**
 * ----------------------------------------------------------------------------
 * Options and Settings
 * ----------------------------------------------------------------------------
 */
const opts = {
  styles: {
    failAfterError: true,
    reportOutputDir: 'logs/gulp',
    reporters: [
      { formatter: 'string', console: true, save: 'styles.txt' }
    ],
    syntax: 'scss'
  },
  sass: {
    outputStyle: 'expanded',
    precision: 6
  },
  autoprefixer: {
    // for browsers options see .browserslistrc
    cascade: false
  },
  csso: {
    comments: false
  },
  eslint: {
    // for more options see .eslintrc.json
  },
  babel: {
    // for more options see .babelrc.js
    comments: false
  },
  uglify: {
    compress: {
      evaluate: false
    },
    mangle: {
      keep_fnames: true
    }
  },
  images: [
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 4 }),
    imagemin.svgo({ plugins: [{ removeViewBox: true }] })
  ],
  webp: {
    // https://github.com/imagemin/imagemin-webp#options
    preset: 'default',
    quality: 60
  },
  pug: {
    doctype: 'html',
    pretty: true
  },
  html: {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  inline: {
    rootpath: `${dirs.dest}/`
  },
  watch: {
    delay: 2000
  }
};

/**
 * ----------------------------------------------------------------------------
 * Stamps: header, start, end
 * ----------------------------------------------------------------------------
 */
const stamp = {
  top: `/*!
 * ${pkg.title} - ${pkg.description} - v${pkg.version} - <%= file.relative %>
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author} (${pkg.homepage})
 * License under ${pkg.license} (${pkg.repository}/blob/master/LICENSE)
 * ============================================================================
 */\n`
};

/**
 * ----------------------------------------------------------------------------
 * Clean - clean all files from 'dist' folder
 * ----------------------------------------------------------------------------
 */
gulp.task('clean', () => {
  log(`${green('Clean all files')} in ${magenta(dirs.dest)} folder`);
  return del(dirs.dest);
});

/**
 * ----------------------------------------------------------------------------
 * Styles - processes style files
 * ----------------------------------------------------------------------------
 */
gulp.task('clean:styles', () => {
  log(`Clean all styles in ${magenta(paths.styles.dest)} folder`);
  return del(paths.styles.dest);
});
gulp.task('vendor:styles', () => {
  return gulp.src(paths.vendor.src.css, {
    since: gulp.lastRun('vendor:styles')
  })
    .pipe(gulp.dest(paths.vendor.dest.css))
    .pipe(bs.stream({ match: '**/*.min.css' }));
});
gulp.task('lint:styles', () => {
  return gulp.src(paths.styles.src, {
    since: gulp.lastRun('lint:styles')
  })
    .pipe(stylelint(opts.styles));
});
gulp.task('compile', () => {
  return gulp.src(paths.styles.src, {
    sourcemaps: true
  })
    // Compile
    .pipe(sass(opts.sass).on('error', sass.logError))
    .pipe(autoprefixer(opts.autoprefixer))
    .pipe(header(stamp.top, { pkg: pkg }))
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.css' }))

    // Minify
    .pipe(filter(paths.styles.filter))
    .pipe(csso(opts.csso))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream({ match: '**/*.min.css' }));
});
gulp.task('styles', gulp.parallel(
  'vendor:styles',
  gulp.series('lint:styles', 'compile')
));
gulp.task('build:styles', gulp.series('clean:styles', 'styles'));

/**
 * ----------------------------------------------------------------------------
 * Scripts - processes script files
 * ----------------------------------------------------------------------------
 */
gulp.task('clean:scripts', () => {
  log(`Clean all scripts in ${magenta(paths.scripts.dest)} folder`);
  return del(paths.scripts.dest);
});
gulp.task('vendor:scripts', () => {
  return gulp.src(paths.vendor.src.js, {
    since: gulp.lastRun('vendor:scripts')
  })
    .pipe(gulp.dest(paths.vendor.dest.js))
    .pipe(bs.stream({ match: '**/*.min.js' }));
});
gulp.task('lint:scripts', () => {
  const outputDir = 'logs/gulp';
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return gulp.src(paths.scripts.src, {
    since: gulp.lastRun('lint:scripts')
  })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('stylish', output))
    .pipe(eslint.failAfterError());
});
gulp.task('transpile', () => {
  return gulp.src(paths.scripts.src, {
    sourcemaps: true,
    since: gulp.lastRun('transpile')
  })
    // Transpile
    .pipe(babel(opts.babel))
    .pipe(header(stamp.top, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: './maps' }))
    .pipe(bs.stream({ match: '**/*.js' }))

    // Minify
    .pipe(filter(paths.scripts.filter))
    .pipe(uglify(opts.uglify))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(header(stamp.top, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream({ match: '**/*.min.js' }));
});
gulp.task('scripts', gulp.parallel(
  'vendor:scripts',
  gulp.series('lint:scripts', 'transpile')
));
gulp.task('build:scripts', gulp.series('clean:scripts', 'scripts'));

/**
 * ----------------------------------------------------------------------------
 * Images - processes image files
 * ----------------------------------------------------------------------------
 */
gulp.task('clean:images', () => {
  log(`Clean all images in ${magenta(paths.images.dest)} folder`);
  return del(paths.images.dest);
});
gulp.task('imagine', () => {
  return gulp.src(paths.images.src, {
    since: gulp.lastRun('imagine')
  })
    .pipe(imagemin(opts.images, { verbose: true }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{gif,jpg,jpeg,png,svg}' }));
});
gulp.task('convert', () => {
  return gulp.src(paths.images.webp, {
    since: gulp.lastRun('convert')
  })
    .pipe(webp(opts.webp))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(bs.stream({ match: '**/*.{webp}' }));
});
gulp.task('images', gulp.series('imagine', 'convert'));
gulp.task('build:images', gulp.series('clean:images', 'images'));

/**
 * ----------------------------------------------------------------------------
 * Statics - processes static files
 * ----------------------------------------------------------------------------
 */
gulp.task('clean:statics', () => {
  log(`Clean all statics in ${magenta(paths.statics.dest)} folder`);
  return del(paths.statics.dest);
});
gulp.task('statica', () => {
  return gulp.src(paths.statics.src, {
    since: gulp.lastRun('statica')
  })
    .pipe(gulp.dest(paths.statics.dest))
    .pipe(bs.stream({ match: '**/*.{ico,png,svg,xml,json,webmanifest}' }));
});
gulp.task('statics', gulp.parallel('statica'));
gulp.task('build:statics', gulp.series('clean:statics', 'statica'));

/**
 * ----------------------------------------------------------------------------
 * Templates - processes templates files
 * ----------------------------------------------------------------------------
 */
gulp.task('clean:pages', () => {
  log(`Clean all pages in ${magenta(paths.views.dest)} folder`);
  return del(paths.views.del);
});
gulp.task('lint:pages', () => {
  return gulp.src(paths.views.all, {
    since: gulp.lastRun('lint:pages')
  })
    .pipe(puglint())
    .pipe(puglint({ reporter: 'default' }))
    .pipe(puglint({ failAfterError: true }));
});
gulp.task('pagile', () => {
  var dataFile = paths.views.datas + 'menu.json';

  return gulp.src(paths.views.src)
    .pipe(data(() => {
      return JSON.parse(fs.readFileSync(dataFile));
    }))
    .pipe(pug(opts.pug))
    .pipe(cached('pug_compile'))
    .pipe(inlinesource(opts.inline))
    .pipe(htmlmin(opts.html))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(bs.stream({ match: '**/*.html' }));
});
gulp.task('pages', gulp.series('lint:pages', 'pagile'));
gulp.task('build:pages', gulp.series('clean:pages', 'pages'));

/**
 * ----------------------------------------------------------------------------
 * Watch and Serve - watch files for changes and reload
 * Starts a BrowerSync instance
 * Watch files for changes
 * ----------------------------------------------------------------------------
 */
gulp.task('serve', () => {
  bs.init({
    server: {
      baseDir: dirs.dest
    },
    port: 6969,
    logPrefix: 'Adorade',
    ui: false
  });

  function watchEvent(path, event, task) {
    log(
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
    log(bgRed(`Watching ${watcher.name}`));

    for (let p of [watcher.paths]) {
      log(bgBlue('Source: '), magenta(p));
    }

    gulp.watch(
      watcher.paths, opts.watch, gulp.series(watcher.tasks)
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
gulp.task('build', gulp.series(
  'clean', 'styles', 'scripts', 'images', 'statics', 'pages'
));

/**
 * ----------------------------------------------------------------------------
 * Define `dev` task - build, edit source, reload
 * Runs all of the above tasks and then waits for files to change
 * ----------------------------------------------------------------------------
 */
gulp.task('dev', gulp.series('build', 'serve'));

/**
 * ----------------------------------------------------------------------------
 * Define default task that can be called by just running `gulp` from cli
 * ----------------------------------------------------------------------------
 */
gulp.task('default', gulp.parallel('dev'));
