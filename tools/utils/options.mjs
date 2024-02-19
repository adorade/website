/*!
 * Adorade (v2.1.0): tools/utils/options.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { isProd, isSilent, dirs, paths } from './index.mjs';

export const opts = {
  entry: {
    inline: isProd ? true : false
  },
  styles: {
    failAfterError: true,
    reportOutputDir: paths.logs.gulp,
    reporters: [
      { formatter: 'string', console: true, save: 'styles.txt' }
    ]
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
    // for more options see .eslintrc.js
  },
  terser: {
    compress: {
      evaluate: false
    },
    output: {
      comments: false
    },
    keep_classnames: true,
    keep_fnames: true
  },
  images: {
    gif: { interlaced: true },
    jpeg: { progressive: true },
    png: { optimizationLevel: 4 },
    svg: { plugins: [
      {
        name: 'removeViewBox',
        active: true
      }
    ]},
    general: {
      verbose: false,
      silent: true
    },
    webp: {
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
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  inline: {
    rootpath: isProd ? `${dirs.prod}/` : `${dirs.dev}/`
  },
  size: {
    gzip: isProd ? true : false,
    showFiles: isSilent ? false : true,
    showTotal: isSilent ? false : true
  },
  watch: {
    delay: 2000
  }
};
