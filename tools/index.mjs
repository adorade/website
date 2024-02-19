/*!
 * Adorade (v2.1.0): tools/index.mjs
 * Copyright (c) 2018-23 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export {
  help, checks, clean,                                      // Help, Checks and Clean
  cleanCss, lintScss, compile, minifyCss,                   // Styles
  cleanJs, lintMjs, colorJs, transpile, minifyJs,           // Scripts
  cleanImages, imagine, convert,                            // Images
  cleanStatics, favicons, statica,                          // Statics
  cleanFonts, fontsCss, fontsSvg,                           // Fonts
  cleanPages, lintPages, pagile, pagify,                    // Pages
  serve                                                     // Serve and Watch
} from './tasks/index.mjs';
