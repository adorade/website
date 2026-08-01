/*!
 * Adorade (v2.2.0-dev): tools/utils/options.mjs
 * Copyright (c) 2018-26 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

import { babel } from '@rollup/plugin-babel';

import { isProd, isSilent, dirs, paths } from './index.mjs';

export const opts = {
  entry: {
    inline: isProd ? true : false
  },
  styles: {
    // failAfterError: true, // default: true
    reporters: [
      { formatter: 'stylish', console: true, log: `${paths.logs.gulp}/styles.txt` }
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
    // for more options see eslint.config.mjs
  },
  rollup: {
    inputOpts: {
      // `input` is optional
      plugins: [
        babel({
          // for more options see: babel.config.mjs,
          babelHelpers: 'bundled'
          // comments: false, // default: true
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
    gif: { interlaced: true, optimizationLevel: 3 },
    jpeg: {
      progressive: true,
      quality: isProd ? 85 : 90,
      mozjpeg: true
    },
    png: {
      optimizationLevel: isProd ? 7 : 4,
      strip: isProd
    },
    svg: { plugins: [
      {
        name: 'removeViewBox',
        active: true
      },
      {
        name: 'removeUselessStrokeAndFill',
        active: true
      },
      {
        name: 'cleanupIDs',
        active: true
      },
      {
        name: 'removeMetadata',
        active: true
      },
      {
        name: 'removeComments',
        active: true
      }
    ]},
    general: {
      verbose: false,
      silent: true
    },
    webp: {
      preset: 'default',
      quality: isProd ? 80 : 85,
      method: 6,
      lossless: false
    },
    avif: {
      quality: isProd ? 70 : 80,
      speed: 2
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
    // gzip: isProd ? true : false,
    brotli: isProd ? true : false,
    showFiles: isSilent ? false : true,
    showTotal: isSilent ? false : true
  },
  performance: {
    css: 200 * 1024, // 200 KB
    js: 50 * 1024, // 50 KB
    images: 2.5 * 1024 * 1024 // 2.5 MB
  },
  watch: {
    delay: 2000
  }
};
