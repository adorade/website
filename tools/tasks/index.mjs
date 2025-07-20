/*!
 * Adorade (v2.2.0): tools/tasks/index.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export { help } from './help.mjs';
export { checks } from './checks.mjs';
export { clean } from './clean.mjs';
export { cleanCss, lintScss, compile, minifyCss } from './styles.mjs';
export { cleanJs, lintMjs, colorJs, transpile, minifyJs } from './scripts.mjs';
export { cleanStatics, favicons, statica } from './statics.mjs';
export { cleanFonts, fontsCss, fontsSvg } from './fonts.mjs';
export { cleanImages, imagine, convert } from './images.mjs';
export { cleanPages, lintPages, pagile, pagify } from './pages.mjs';
export { serve } from './serve.mjs';
export { performanceAnalysis } from './performance.mjs';
