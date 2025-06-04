/*!
 * Adorade (v2.2.0): stylelint.config.js
 * Copyright (c) 2019-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

/** @type {import('stylelint').Config} */
export default {
  extends: [ '@adorade/stylelint-config' ],
  overrides: [
    {
      files: '**/*.scss',
      rules: {
        // Temporary fix for the issue with `scss/dollar-variable-colon-space-before` rule
        'scss/dollar-variable-colon-space-before': null
      }
    }
  ]
}
