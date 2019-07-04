/*!
 * Adorade (v1.0.0): tools/tasks/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export { checks } from './checks';                                              // Checks
export { clean } from './clean';                                                // Clean
export { cleanCss, vendorCss, lintScss, compile, minify } from './styles';      // Styles
export { cleanJs, vendorJs, lintEs, transpile, uglify } from './scripts';       // Scripts
export { cleanStatics, favicons, statica } from './statics';                    // Statics
export { cleanImages, imagine, convert } from './images';                       // Images
export { cleanPages, lintPages, pagile, pagify } from './pages';                // Pages
export { cleanDeploy, deploy } from './deploy';                                 // Deploy
export { serve } from './serve';                                                // Serve and Watch
export { serviceWorker } from './workbox';                                      // Workbox build
