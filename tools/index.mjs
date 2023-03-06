/*!
 * Adorade (v1.1.0): tools/index.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export {
  help, checks, clean,                                  // Help, Checks and Clean
  cleanCss, vendorCss, lintScss, compile, minifyCss,    // Styles
  cleanJs, vendorJs, lintMjs, transpile, minifyJs,      // Scripts
  cleanImages, imagine, convert,                        // Images
  cleanStatics, favicons, statica,                      // Statics
  cleanFonts, fontsCss, fontsSvg,                       // Fonts
  cleanPages, lintPages, pagile, pagify,                // Pages
  cleanDeploy, deploy,                                  // Deploy
  serve,                                                // Serve and Watch
  cleanSW, serviceWorker                                // Workbox build
} from './tasks/index.mjs';
