/*!
 * Adorade (v1.0.0): tools/util/config.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export const dirs = {
  root: './',
  src: 'src',
  build: 'build',
  dest: 'dist',
  test: 'test',
  deploy: '.publish',
  logs: 'logs'
};

export const paths = {
  styles: {
    src: `${dirs.src}/scss/**/*.scss`,
    dest: `${dirs.dest}/css/`,
    filter: [ `${dirs.dest}/css/*.css`, '!**/*.min.css' ]
  },
  scripts: {
    src: `${dirs.src}/es6/**/*.es6`,
    dest: `${dirs.dest}/js/`,
    filter: [ `${dirs.dest}/js/*.js`, '!**/*.min.js' ]
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
    src: [ `${dirs.src}/views/**/*.pug`, '!**/_*.pug' ],
    all: `${dirs.src}/views/**/*.pug`,
    data: `${dirs.src}/views/data/**/*.json`,
    datas: `${dirs.src}/views/data/`,
    dest: `${dirs.dest}/`,
    del: `${dirs.dest}/*.html`
  },
  test: {
    js: `${dirs.test}/js/`
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};
