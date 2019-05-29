/*!
 * Adorade (v1.0.0): tools/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export {
  checks, clean,                                                    // Checks and Clean
  cleanStyles, vendorStyles, lintStyles, compile, minStyles,        // Styles
  cleanScripts, vendorScripts, lintScripts, transpile, minScripts,  // Scripts
  cleanImages, imagine, convert,                                    // Images
  cleanStatics, statica,                                            // Statics
  cleanPages, lintPages, pagile,                                    // Pages
  cleanDeploy, deploy,                                              // Deploy
  serve                                                             // Serve and Watch
} from './tasks';
