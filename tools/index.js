/*!
 * Adorade (v1.0.0): tools/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export {
  checks, clean,                                        // Checks and Clean
  cleanCss, vendorCss, lintScss, compile, minify,       // Styles
  cleanJs, vendorJs, lintEs, transpile, uglify,         // Scripts
  cleanImages, imagine, convert,                        // Images
  cleanStatics, statica,                                // Statics
  cleanPages, lintPages, pagile, pagify,                // Pages
  cleanDeploy, deploy,                                  // Deploy
  serve,                                                // Serve and Watch
  serviceWorker                                             // Workbox build
} from './tasks';
