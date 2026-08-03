/*!
 * Adorade (v2.3.0): babel.config.mjs
 * Copyright (c) 2026 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

export default {
  // Presets used for code transformation
  presets: [
    [
      // Babel 8 requires full package names instead of short aliases (e.g., '@babel/preset-env')
      '@babel/preset-env',
      {
        // 'modules: false' prevents Babel from transforming ES modules (import/export) to CommonJS (require)
        // This allows modern bundlers (Webpack, Rollup, Vite) to perform optimizations like Tree-Shaking
        modules: false,

        // To keep the behavior 'loose', the 'assumptions' object is used in the configuration settings
        // loose: true,

        // Excludes the typeof symbol transformation to fully mirror the legacy 'loose: true' behavior
        exclude: ['transform-typeof-symbol']

        // Turn on extra optimizations for stabilized features
        // bugfixes: true,
      }
    ]
  ],

  // Additional plugins for specific syntax extensions or custom transformations
  plugins: [
    // Add custom plugins here if needed
    // '@babel/plugin-transform-runtime',
  ],

  // In Babel 8, the legacy `loose: true` option inside preset-env is replaced by top-level assumptions
  // This complete list mirrors all internal compiler assumptions previously toggled by `loose: true`
  assumptions: {
    arrayLikeIsIterable: true,
    constantReexports: true,
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    mutableTemplateObject: true,
    noClassCalls: true,
    noDocumentAll: true,
    objectRestNoSymbols: true,
    privateFieldsAsProperties: true,
    pureGetters: true,
    setClassMethods: true,
    setComputedProperties: true,
    setPublicClassFields: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true,
    superIsCallableConstructor: true
  }

  // Performance and environment settings
  // sourceMaps: true,

  // Strip all comments from the generated output code - moved to rollup options
  // comments: false
};
