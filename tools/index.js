/*!
 * Adorade (v1.0.0): tools/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export {
  checks, clean,                                        // Checks and Clean
  cleanCss, vendorCss, lintScss, compile, minifyCss,    // Styles
  cleanJs, vendorJs, lintMjs, transpile, minifyJs,      // Scripts
  cleanImages, imagine, convert,                        // Images
  cleanStatics, favicons, statica,                      // Statics
  cleanFonts, fontsCss, fontsSvg,                       // Fonts
  cleanPages, lintPages, pagile, pagify,                // Pages
  cleanDeploy, deploy,                                  // Deploy
  serve,                                                // Serve and Watch
  cleanSW, serviceWorker                                // Workbox build
} from './tasks';
