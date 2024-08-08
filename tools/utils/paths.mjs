/*!
 * Adorade (v2.1.0): tools/utils/config.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { babel } from '@rollup/plugin-babel';

export const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  test: 'test',
  modules: 'node_modules',
  logs: 'logs'
};

export const paths = {
  styles: {
    src: `${dirs.src}/scss/**/*.scss`,
    dev: `${dirs.dev}/css/`,
    prod: `${dirs.prod}/css/`,
    filter: [ `${dirs.dev}/css/**/*.css`, '!**/*.min.css' ]
  },
  scripts: {
    color: `${dirs.src}/mjs/color-modes.js`,
    src: `${dirs.src}/mjs/**/*.+(m|js)`,
    input: `${dirs.src}/mjs/script.mjs`,
    dev: `${dirs.dev}/js/`,
    prod: `${dirs.prod}/js/`,
    filter: [ `${dirs.dev}/js/**/*.js`, '!**/*.min.js' ]
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
      // `sourcemap` is optional
      file: 'script.js',
      format: 'cjs'
    }
  },
  fonts: {
    css: {
      src: `${dirs.src}/fonts/**/*.css`,
      dev: `${dirs.dev}/fonts/`,
      prod: `${dirs.prod}/fonts/`
    },
    svg: {
      src: `${dirs.src}/fonts/**/*.svg`,
      dev: `${dirs.dev}/fonts/`,
      prod: `${dirs.prod}/fonts/`
    }
  },
  images: {
    src: `${dirs.src}/images/**/*.{gif,jpg,jpeg,png,svg}`,
    webp: `${dirs.src}/images/**/*.{jpg,jpeg,png}`,
    dev: `${dirs.dev}/images/`,
    prod: `${dirs.prod}/images/`
  },
  statics: {
    src: {
      icons: `${dirs.src}/statics/**/*.{ico,png,svg}`,
      conf: `${dirs.src}/statics/**/*.{json,txt,webmanifest,xml}`
    },
    dev: `${dirs.dev}/statics/`,
    prod: `${dirs.prod}/statics/`,
    ext: '**/*.{json,txt,webmanifest,xml}'
  },
  views: {
    src: [ `${dirs.src}/views/**/*.pug`, '!**/_*.pug' ],
    all: `${dirs.src}/views/**/*.pug`,
    data: `${dirs.src}/views/data/**/*.json`,
    datas: `${dirs.src}/views/data/`,
    dev: `${dirs.dev}/`,
    prod: `${dirs.prod}/`,
    files: {
      dev: `${dirs.dev}/**/*.html`,
      prod: `${dirs.prod}/**/*.html`
    }
  },
  test: {
    js: `${dirs.test}/js/`
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};
