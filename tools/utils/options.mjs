/*!
 * Adorade (v2.2.0): tools/utils/options.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { babel } from '@rollup/plugin-babel';

import { isProd, isSilent, dirs } from './index.mjs';

export const opts = {
  entry: {
    inline: isProd ? true : false
  },
  styles: {
    // failAfterError: true, // default: true
    reporters: [
      { formatter: 'stylish', console: true, save: 'styles.txt' }
    ]
  },
  sass: {
    style: 'expanded',
    precision: 6,
    silenceDeprecations: [
      'import',
      'global-builtin',
      'color-functions',
      'mixed-decls'
    ]
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
  rollup: {
    inputOpts: {
      // `input` is optional
      plugins: [
        babel({
          // for more options see: .babelrc.js,
          babelHelpers: 'bundled'
        })
      ]
    },
    outputOpts: {
      file: 'script.js',
      format: 'cjs'
      // for `sourcemap` use gulp sourcemap
    }
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
    // minifyJS: false,
    minifyJS: {
      compress: false
    },
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
