/*!
 * Adorade (v1.0.0): tools/tasks/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export { help } from './help.js';                                                  // Help
export { checks } from './checks.js';                                              // Checks
export { clean } from './clean.js';                                                // Clean
export { cleanCss, vendorCss, lintScss, compile, minifyCss } from './styles.js';   // Styles
export { cleanJs, vendorJs, lintMjs, transpile, minifyJs } from './scripts.js';    // Scripts
export { cleanStatics, favicons, statica } from './statics.js';                    // Statics
export { cleanFonts, fontsCss, fontsSvg } from './fonts.js';                       // Fonts
export { cleanImages, imagine, convert } from './images.js';                       // Images
export { cleanPages, lintPages, pagile, pagify } from './pages.js';                // Pages
export { cleanDeploy, deploy } from './deploy.js';                                 // Deploy
export { serve } from './serve.js';                                                // Serve and Watch
export { cleanSW, serviceWorker } from './workbox.js';                             // Workbox build
