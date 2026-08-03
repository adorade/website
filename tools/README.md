# Build Tools

These build tools use a Gulp-based pipeline for compiling styles, scripts, pages, images, and static assets for both development and production workflows.

## Requirements

This project has a few requirements you need to meet in order to build it successfully.

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/en/)
- [Gulp](http://gulpjs.com/)

## Install

```sh
# verify requirements
node -v; yarn -v; gulp -v

# install dependencies
yarn
```

## Build

```sh
# list all tasks
gulp -T

# short
gulp -T --depth=0

# check all settings
gulp check:settings

# build in development mode
gulp
gulp build

# build in production mode
gulp --prod
gulp build --prod

# analyze bundle performance and optimization metrics for production
gulp performance:analysis

# delete all files
gulp clean:all --clean
```

```sh
gulp help
========================= Help for Adorade =========================

  Usage: gulp <task> <task>... [flags]

  The gulp <task>s are the following:
--------------------------------------------------------------------
  help                 Print help message
  check:settings       Check gulp configuration
  clean:all            Clean up dist folders
  build:styles         Build only styles files
  build:scripts        Build only scripts files
  build:images         Build only images files
  build:statics        Build statics files
  build:fonts          Build fonts files
  build:pages          Build only html files
  build:sw             Build only Service Worker
  serve:watch          Start the server and watch for any changes
  performance:analysis Analyze bundle performance
  build                Build task for production
  default              Default gulp task
--------------------------------------------------------------------
  Run `gulp -T` to see all available gulp tasks.

  The [flag]s for build task are the following:
--------------------------------------------------------------------
  `--clean`            Clean up all generated files
  `--production`       Build in production mode
  `--silent`           Silent mode

====================================================================
```

## Tasks

| Name    | Description | Development | Production |
|---------|-------------|-------------|------------|
| Help    | Print help message | + | + |
| Check   | Check for settings | + | + |
| Clean   | Clean up dist folders | tmp | tmp, dist |
| Styles  | Build only styles files | tmp | inline |
| Scripts | Build only scripts files | tmp | inline |
| Images  | Build only images files | tmp | optimize |
| Statics | Build only statics files | tmp | dist |
| Fonts   | Build only fonts files | tmp | inline |
| Pages   | Build only pages files | tmp | dist |
| Worker  | Build only Service Worker | - | dist |
| Serve   | Serve and Watch | tmp | dist |
| Analyze | Analyze bundle performance | - | dist |
| Build   | Build task for production | - | dist |
| Default | Development task with serve | tmp | - |

## Task plugins and modules

The task files under `tools/tasks` are small Gulp pipelines that reuse a common helper layer from `tools/utils` and add task-specific plugins where needed.

### Shared modules

- Gulp API helpers: `src`, `dest`, `series`, `parallel`, `lastRun`, `watch`, `tree`
- File and stream utilities: `fs`, `del`, `browser-sync`, `fancy-log`, `ansi-colors`, `gulp-cached`, `gulp-header`, `gulp-rename`, `gulp-size`

### Task breakdown

| Task file | Plugins / modules used |
|-----------|-------------------------|
| `tasks/styles.mjs` | `gulp-stylelint-esm`, `sass-embedded`, `gulp-sass`, `gulp-autoprefixer`, `gulp-csso` |
| `tasks/scripts.mjs` | `gulp-eslint-new`, `gulp-terser-js`, and the custom Rollup plugin from `tools/plugins/rollup.mjs` |
| `tasks/pages.mjs` | `gulp-pug-linter`, `gulp-data`, `gulp-pug`, `gulp-inline-source-html`, `gulp-htmlmin` |
| `tasks/images.mjs` | `gulp-imagemin` with `gifsicle`, `mozjpeg`, `optipng`, and `svgo`, plus `gulp-webp` and `gulp-avif` |
| `tasks/statics.mjs` | Shared Gulp utilities only; copies favicons and static files |
| `tasks/fonts.mjs` | Shared Gulp utilities only; copies CSS and SVG font assets |
| `tasks/serve.mjs` | BrowserSync and watcher orchestration from shared Gulp utilities |
| `tasks/performance.mjs` | Node core `stream` and `zlib` helpers plus shared logging and path settings |
| `tasks/clean.mjs`, `tasks/help.mjs`, `tasks/checks.mjs` | Shared utilities for cleanup, logging, and CLI checks |

### Dev dependencies

These packages are not part of the Gulp task pipelines directly, but they power the linting, style, and bundling configuration used by the build tools:

- `@adorade/stylelint-config` — shared Stylelint rules extended by the project style config.
- `@stylistic/eslint-plugin` — adds the stylistic ESLint rules used in the main ESLint configuration.
- `@babel/core`, `@babel/eslint-parser`, `@babel/preset-env` — support JavaScript parsing and transpilation for the Rollup/Babel pipeline.
- `@eslint/js`, `globals` — provide the base ESLint rules and browser/node globals used by the lint setup.
- `@rollup/plugin-babel` — supplies the Babel plugin used in the Rollup configuration for script bundling.
- `postcss` — used for Stylelint configuration and as a peer dependency in the style pipeline tooling.

## Utils

| Name     | Description |
|----------|---------------|
| Banner   | Header License for `css` and `js` files |
| Options  | Configuration and options for `modules` and `plugins` |
| Paths    | Paths settings for tasks |
| Modules  | Import all node modules and gulp plugins |
| Settings | Settings for projects |

## Plugins

The Rollup plugin used by the build tools is a custom Gulp transform that bundles JavaScript entry files with Rollup and passes the generated output through the normal Gulp stream. It is used by the scripts task to transpile and bundle MJS modules into browser-ready output while preserving source maps, file headers, and minification settings.

## Debugging example

```js
// For debugging usage:
import debug from 'gulp-debug';
export function example () {
  return src(path.to.source)
    .pipe(plugin(opts.plugin))
    .pipe(debug({ title: 'unicorn:' }))
    .pipe(dest(path.to.dest));
}
```

## ESLint config inspect

```sh
# yarn eslint --inspect-config
# run this command directly in the same directory as your configuration file
npx @eslint/config-inspector@latest
```

## Troubleshooting

- Run `yarn` again if a task fails because a package is missing.
- Clear generated output folders with `gulp clean:all --clean` when stale files cause unexpected behavior.
- If watch mode stops updating, restart the watcher and confirm the relevant source folder is being monitored.

## Localhost access

Go to `chrome://net-internals` in the Chrome and switch to the **Domain Security Policy** tab.

In the "Delete domain security policies" section at the bottom, write "localhost" in Domain field and press the "Delete" button.
