/*!
 * Adorade (v1.0.0): tools/util/config.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  test: 'test',
  deploy: '.publish',
  logs: 'logs'
};

export const paths = {
  styles: {
    src: `${dirs.src}/scss/**/*.scss`,
    dev: `${dirs.dev}/css/`,
    prod: `${dirs.prod}/css/`,
    filter: [ `${dirs.dev}/css/*.css`, '!**/*.min.css' ]
  },
  scripts: {
    src: `${dirs.src}/es6/**/*.es6`,
    dev: `${dirs.dev}/js/`,
    prod: `${dirs.prod}/js/`,
    filter: [ `${dirs.dev}/js/*.js`, '!**/*.min.js' ]
  },
  vendor: {
    src: {
      css: `${dirs.src}/vendor/css/**/*.css`,
      js: `${dirs.src}/vendor/js/**/*.js`
    },
    dev: {
      css: `${dirs.dev}/css/vendor/`,
      js: `${dirs.dev}/js/vendor/`
    },
    prod: {
      css: `${dirs.prod}/css/vendor/`,
      js: `${dirs.prod}/js/vendor/`
    }
  },
  images: {
    src: `${dirs.src}/images/**/*.{gif,jpg,jpeg,png,svg}`,
    webp: `${dirs.src}/images/**/*.{jpg,jpeg,png}`,
    dev: `${dirs.dev}/images/`,
    prod: `${dirs.prod}/images/`
  },
  statics: {
    src: `${dirs.src}/statics/**/*.{ico,png,xml,json,svg,webmanifest}`,
    dev: `${dirs.dev}/statics/`,
    prod: `${dirs.prod}/statics/`
  },
  views: {
    src: [ `${dirs.src}/views/**/*.pug`, '!**/_*.pug' ],
    all: `${dirs.src}/views/**/*.pug`,
    data: `${dirs.src}/views/data/**/*.json`,
    datas: `${dirs.src}/views/data/`,
    dev: `${dirs.dev}/`,
    prod: `${dirs.prod}/`,
    files: {
      dev: `${dirs.dev}/*.html`,
      prod: `${dirs.prod}/*.html`
    }
  },
  test: {
    js: `${dirs.test}/js/`
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};
