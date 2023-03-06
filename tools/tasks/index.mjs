/*!
 * Adorade (v1.1.0): tools/tasks/index.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export { help } from './help.mjs';                                                  // Help
export { checks } from './checks.mjs';                                              // Checks
export { clean } from './clean.mjs';                                                // Clean
export { cleanCss, vendorCss, lintScss, compile, minifyCss } from './styles.mjs';   // Styles
export { cleanJs, vendorJs, lintMjs, transpile, minifyJs } from './scripts.mjs';    // Scripts
export { cleanStatics, favicons, statica } from './statics.mjs';                    // Statics
export { cleanFonts, fontsCss, fontsSvg } from './fonts.mjs';                       // Fonts
export { cleanImages, imagine, convert } from './images.mjs';                       // Images
export { cleanPages, lintPages, pagile, pagify } from './pages.mjs';                // Pages
export { cleanDeploy, deploy } from './deploy.mjs';                                 // Deploy
export { serve } from './serve.mjs';                                                // Serve and Watch
export { cleanSW, serviceWorker } from './workbox.mjs';                             // Workbox build
