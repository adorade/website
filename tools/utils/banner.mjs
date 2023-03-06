/*!
 * Adorade (v1.1.0): tools/util/banner.js
 * Copyright (c) 2018 - 2023 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { pkg, title, time } from './index.mjs';

const year = time.getFullYear();

export function banner () {
  let result = '';

  try {
    result = [
      '/*!',
      ` * ${title} (v${pkg.version}): <%= file.relative %>`,
      ` * ${pkg.description}`,
      ` * Copyright (c) 2010 - ${year} ${pkg.author.name} (${pkg.homepage})`,
      ` * License under ${pkg.license} (${pkg.repository}/blob/master/LICENSE)`,
      ' * ========================================================================== */',
      '' // new line
    ].join('\n');
  } catch (err) {
    console.error(err);
  }

  return result;
}
