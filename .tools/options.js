/*!
 * Adorade (v1.0.0): options.js
 * Copyright (c) 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ============================================================================
 */

const { dirs, paths } = require('./config');

const dates = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toDateString();

const opts = {
  styles: {
    failAfterError: true,
    reportOutputDir: paths.logs.gulp,
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
  images: {
    gif: { interlaced: true },
    jpeg: { progressive: true },
    png: { optimizationLevel: 4 },
    svg: { plugins: [{ removeViewBox: true }] },
    webp: { // https://github.com/imagemin/imagemin-webp#options
      preset: 'default',
      quality: 60
    }
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
    // removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  inline: {
    rootpath: `${dirs.dest}/`
  },
  deploy: {
    remoteUrl: 'https://github.com/adorade/adorade.github.io.git',
    // branch: 'gh-pages',
    // cacheDir: '.publish',
    // push: true,
    // force: false,
    message: `Update ${dates}`
  },
  watch: {
    delay: 2000
  }
};

module.exports = {
  opts
};
