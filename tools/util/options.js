/*!
 * Adorade (v1.0.0): tools/util/options.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { args } from './plugins';
import { dirs, paths } from './config';

const dates = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toDateString();

export const opts = {
  entry: {
    inline: false
  },
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
    general: {
      verbose: args.production ? false : true,
      silent: true
    },
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
    rootpath: args.production ? `${dirs.prod}/` : `${dirs.dev}/`
  },
  size: {
    gzip: true,
    showFiles: true
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
