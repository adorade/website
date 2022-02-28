/*!
 * Adorade (v1.0.0): tools/util/config.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { isProd } from './index.js';

export const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  test: 'test',
  modules: 'node_modules',
  deploy: '.publish',
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
    src: `${dirs.src}/mjs/**/*.mjs`,
    input: isProd ? `${dirs.src}/mjs/script.mjs` : `${dirs.src}/mjs/script-dev.mjs`,
    dev: `${dirs.dev}/js/`,
    prod: `${dirs.prod}/js/`,
    filter: [ `${dirs.dev}/js/**/*.js`, '!**/*.min.js' ]
  },
  vendors: {
    src: {
      css: [
        `${dirs.modules}/cookieconsent/build/cookieconsent.min.css`  // 3.1.1
      ],
      js: [
        `${dirs.modules}/jquery/dist/jquery.min.js`,                 // 3.6.0
        `${dirs.modules}/@popperjs/core/dist/umd/popper.min.js`,     // 2.11.2
        `${dirs.modules}/bootstrap/dist/js/bootstrap.min.js`,        // 5.1.3
        `${dirs.modules}/cookieconsent/build/cookieconsent.min.js`   // 3.1.1
      ]
    },
    dest: {
      css: isProd ? `${dirs.prod}/css/` : `${dirs.dev}/css/`,
      js: isProd ? `${dirs.prod}/js/` : `${dirs.dev}/js/`
    },
    watch: {
      css: `${dirs.src}/vendor/css/**/*.css`,
      js: `${dirs.src}/vendor/js/**/*.js`
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
