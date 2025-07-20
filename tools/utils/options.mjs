/*!
 * Adorade (v2.2.0): tools/utils/options.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

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
    style: isProd ? 'compressed' : 'expanded',
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
    cascade: false,
    grid: 'autoplace'
  },
  csso: {
    comments: false,
    restructure: true,
    forceMediaMerge: true
  },
  purgecss: {
    content: [
      `${dirs.src}/views/**/*.pug`,
      `${dirs.src}/mjs/**/*.{mjs,js}`,
      `${dirs.dev}/**/*.html`,
      `${dirs.prod}/**/*.html`
    ],
    safelist: {
      standard: [
        // Bootstrap components that are dynamically added
        'show', 'fade', 'active', 'modal-open', 'collapsing',
        // Animation classes
        'fade-in', 'card-fade-in', 'shake-x', 'animated',
        // Theme switching classes
        'color-theme-in-transition'
      ],
      deep: [
        // Carousel indicators and controls
        /carousel-/,
        // Modal backdrop
        /modal-backdrop/,
        // Offcanvas
        /offcanvas-/,
        // Alert states
        /alert-/,
        // Button states
        /btn-(primary|secondary|success|danger|warning|info|light|dark|orange|outline-orange)/,
        // Form validation
        /is-(valid|invalid)/,
        /was-validated/
      ],
      greedy: [
        // Utility classes that might be used conditionally
        /^d-/,
        /^flex-/,
        /^justify-content-/,
        /^align-items-/,
        /^m[tblrxy]?-/,
        /^p[tblrxy]?-/
      ]
    },
    fontFace: true,
    keyframes: true,
    variables: true
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
          babelHelpers: 'bundled',
          exclude: 'node_modules/**'
        }),
        ...(isProd ? [
          terser({
            compress: {
              evaluate: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug']
            },
            output: {
              comments: false
            },
            keep_classnames: true,
            keep_fnames: true,
            mangle: {
              properties: false
            }
          })
        ] : [])
      ],
      treeshake: isProd ? {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      } : false
    },
    outputOpts: {
      file: 'script.js',
      format: 'iife',
      compact: isProd
      // for `sourcemap` use gulp sourcemap
    }
  },
  terser: {
    compress: {
      evaluate: false,
      drop_console: isProd,
      drop_debugger: isProd,
      pure_funcs: isProd ? ['console.log', 'console.info', 'console.debug'] : [],
      passes: 2
    },
    output: {
      comments: false
    },
    keep_classnames: true,
    keep_fnames: true,
    mangle: {
      properties: false
    }
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
    svg: { 
      plugins: [
        {
          name: 'removeViewBox',
          active: false
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
      ]
    },
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
    pretty: !isProd
  },
  html: {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: isProd,
    minifyCSS: isProd,
    minifyJS: isProd ? {
      compress: {
        drop_console: true
      }
    } : false,
    removeAttributeQuotes: isProd,
    removeComments: isProd,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeEmptyAttributes: isProd,
    sortAttributes: isProd,
    sortClassName: isProd
  },
  inline: {
    rootpath: isProd ? `${dirs.prod}/` : `${dirs.dev}/`,
    compress: isProd,
    saveRemote: false
  },
  size: {
    gzip: isProd ? true : false,
    brotli: isProd ? true : false,
    showFiles: isSilent ? false : true,
    showTotal: isSilent ? false : true
  },
  watch: {
    delay: 2000
  }
};
