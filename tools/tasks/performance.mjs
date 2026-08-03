/*!
 * Build Tools (3.0.0): tools/tasks/performance.mjs
 * Copyright (c) 2026 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

import { fs, fancyLog, green, magenta, cyan, red, paths, opts } from '../utils/index.mjs';
import { createReadStream } from 'fs';
import { createGzip, createBrotliCompress, constants as zlibConstants } from 'zlib';
import { pipeline } from 'stream/promises';

async function getCompressedSize (filePath, compression) {
  const inputStream = createReadStream(filePath);
  let compressStream;

  if (compression === 'gzip') {
    compressStream = createGzip({ level: 9 });
  } else if (compression === 'brotli') {
    compressStream = createBrotliCompress({
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 11
      }
    });
  }

  if (!compressStream) {
    inputStream.destroy();
    throw new Error(`Unsupported compression type: ${compression}`);
  }

  let size = 0;
  compressStream.on('data', chunk => {
    size += chunk.length;
  });

  try {
    await pipeline(inputStream, compressStream);
  } catch (error) {
    inputStream.destroy();
    throw error;
  }

  return size;
}

async function analyzeImageOptimization () {
  const imageDir = paths.images.prod;
  if (!fs.existsSync(imageDir)) {
    return { message: 'No images directory found' };
  }

  const files = fs.readdirSync(imageDir, { recursive: true });
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file)
  );

  const formats = {};
  let totalSize = 0;
  let totalFiles = 0;

  for (const file of imageFiles) {
    const filePath = `${imageDir}${file}`;
    if (fs.statSync(filePath).isFile()) {
      const size = fs.statSync(filePath).size;
      const ext = file.split('.').pop().toLowerCase();

      if (!formats[ext]) {
        formats[ext] = { count: 0, size: 0 };
      }

      formats[ext].count++;
      formats[ext].size += size;
      totalSize += size;
      totalFiles++;
    }
  }

  return {
    formats,
    totalSize,
    totalFiles,
    averageSize: totalFiles > 0 ? Math.round(totalSize / totalFiles) : 0
  };
}

function formatBytes (bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const idx = Math.min(i, sizes.length - 1);
  return Math.round(bytes / Math.pow(1024, idx) * 100) / 100 + ' ' + sizes[idx];
}

async function mapWithConcurrency (items, limit, iterator) {
  const results = new Array(items.length);
  let index = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await iterator(items[currentIndex], currentIndex);
    }
  });

  await Promise.all(workers);
  return results;
}

function printPerformanceReport (stats) {
  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  fancyLog('📊 Performance Analysis Report');
  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // CSS Report
  if (Object.keys(stats.css).length > 0) {
    fancyLog(`${cyan('📄 CSS Assets:')}`);
    for (const [file, data] of Object.entries(stats.css)) {
      fancyLog(`  ${file}:`);
      fancyLog(`    Original: ${formatBytes(data.original)}`);
      fancyLog(`    Gzip:     ${formatBytes(data.gzip)} (${data.gzipReduction}% reduction)`);
      fancyLog(`    Brotli:   ${formatBytes(data.brotli)} (${data.brotliReduction}% reduction)`);
    }
  }

  // JS Report
  if (Object.keys(stats.js).length > 0) {
    fancyLog(`${cyan('📦 JavaScript Assets:')}`);
    for (const [file, data] of Object.entries(stats.js)) {
      fancyLog(`  ${file}:`);
      fancyLog(`    Original: ${formatBytes(data.original)}`);
      fancyLog(`    Gzip:     ${formatBytes(data.gzip)} (${data.gzipReduction}% reduction)`);
      fancyLog(`    Brotli:   ${formatBytes(data.brotli)} (${data.brotliReduction}% reduction)`);
    }
  }

  // Images Report
  if (stats.images && stats.images.totalFiles > 0) {
    fancyLog(`${cyan('🖼️  Image Assets:')}`);
    fancyLog(`  Total files: ${stats.images.totalFiles}`);
    fancyLog(`  Total size:  ${formatBytes(stats.images.totalSize)}`);
    fancyLog(`  Average:     ${formatBytes(stats.images.averageSize)}`);

    if (stats.images.formats) {
      fancyLog('  By format:');
      for (const [format, data] of Object.entries(stats.images.formats)) {
        fancyLog(`    ${format.toUpperCase()}: ${data.count} files, ${formatBytes(data.size)}`);
      }
    }
  }

  // Performance Tips
  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  fancyLog(`${cyan('💡 Performance Tips:')}`);

  const totalCSSSize = Object.values(stats.css).reduce((sum, data) => sum + data.original, 0);
  const totalJSSize = Object.values(stats.js).reduce((sum, data) => sum + data.original, 0);

  if (totalCSSSize > opts.performance.css) {
    fancyLog(`  ${magenta('⚠️')} CSS bundle is large (${formatBytes(totalCSSSize)}). Consider further optimization.`);
  } else {
    fancyLog(`  ${green('✅')} CSS bundle size is optimized (${formatBytes(totalCSSSize)})`);
  }

  if (totalJSSize > opts.performance.js) {
    fancyLog(`  ${magenta('⚠️')} JS bundle is large (${formatBytes(totalJSSize)}). Consider code splitting.`);
  } else {
    fancyLog(`  ${green('✅')} JS bundle size is optimized (${formatBytes(totalJSSize)})`);
  }

  if (stats.images.formats && !stats.images.formats.webp && !stats.images.formats.avif) {
    fancyLog(`  ${magenta('⚠️')} Consider using modern image formats (WebP/AVIF) for better compression`);
  } else {
    fancyLog(`  ${green('✅')} Using modern image formats for optimal compression`);
  }

  if (stats.images.totalSize > opts.performance.images) {
    fancyLog(`  ${magenta('⚠️')} Total image size is large (${formatBytes(stats.images.totalSize)}). Consider optimizing images.`);
  } else {
    fancyLog(`  ${green('✅')} Total image size is optimized (${formatBytes(stats.images.totalSize)})`);
  }

  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  fancyLog(`${green('Performance analysis completed.')}`);
  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

export async function performanceAnalysis () {
  fancyLog(`${green('-> Analyzing bundle performance for production...')}`);

  const stats = {
    css: {},
    js: {},
    images: {},
    total: {}
  };

  const cssFiles = ['style.min.css', 'thanks.min.css'];
  const jsFiles = ['script.min.js', 'color-modes.min.js'];

  const cssFilesExist = cssFiles.some(file => fs.existsSync(`${paths.styles.prod}${file}`));
  const jsFilesExist = jsFiles.some(file => fs.existsSync(`${paths.scripts.prod}${file}`));
  let imageFilesExist = false;
  if (fs.existsSync(paths.images.prod)) {
    try {
      imageFilesExist = fs.readdirSync(paths.images.prod, { recursive: true })
        .some(file => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file));
    } catch {
      imageFilesExist = false;
    }
  }

  if (!cssFilesExist && !jsFilesExist && !imageFilesExist) {
    fancyLog(`${red('No production build assets found.')}`);
    fancyLog(`Run ${green('build --prod')} and try again.`);
    return;
  }

  // Analyze CSS files
  try {
    await mapWithConcurrency(cssFiles, 2, async file => {
      try {
        const filePath = `${paths.styles.prod}${file}`;
        if (!fs.existsSync(filePath)) return;

        const originalSize = fs.statSync(filePath).size;
        const [gzipSize, brotliSize] = await Promise.all([
          getCompressedSize(filePath, 'gzip'),
          getCompressedSize(filePath, 'brotli')
        ]);

        stats.css[file] = {
          original: originalSize,
          gzip: gzipSize,
          brotli: brotliSize,
          gzipReduction: ((originalSize - gzipSize) / originalSize * 100).toFixed(1),
          brotliReduction: ((originalSize - brotliSize) / originalSize * 100).toFixed(1)
        };
      } catch (error) {
        fancyLog(`${red('CSS file analysis failed:')} ${file} - ${error.message}`);
      }
    });
  } catch (error) {
    fancyLog(`${red('CSS analysis failed:')} ${error.message}`);
  }

  // Analyze JS files
  try {
    await mapWithConcurrency(jsFiles, 2, async file => {
      try {
        const filePath = `${paths.scripts.prod}${file}`;
        if (!fs.existsSync(filePath)) return;

        const originalSize = fs.statSync(filePath).size;
        const [gzipSize, brotliSize] = await Promise.all([
          getCompressedSize(filePath, 'gzip'),
          getCompressedSize(filePath, 'brotli')
        ]);

        stats.js[file] = {
          original: originalSize,
          gzip: gzipSize,
          brotli: brotliSize,
          gzipReduction: ((originalSize - gzipSize) / originalSize * 100).toFixed(1),
          brotliReduction: ((originalSize - brotliSize) / originalSize * 100).toFixed(1)
        };
      } catch (error) {
        fancyLog(`${red('JS file analysis failed:')} ${file} - ${error.message}`);
      }
    });
  } catch (error) {
    fancyLog(`${red('JS analysis failed:')} ${error.message}`);
  }

  // Analyze images
  try {
    const imageStats = await analyzeImageOptimization();
    stats.images = imageStats;
  } catch (error) {
    fancyLog(`${red('Image analysis failed:')} ${error.message}`);
  }

  // Print performance report
  printPerformanceReport(stats);
}
performanceAnalysis.displayName = 'performance:analysis';
performanceAnalysis.description = 'Analyze bundle performance and optimization metrics';
