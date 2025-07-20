/*!
 * Adorade (v2.2.0): tools/tasks/performance.mjs
 * Copyright (c) 2018-24 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, isProd, fs, fancyLog, green, magenta, cyan, red, paths } from '../utils/index.mjs';
import { createReadStream } from 'fs';
import { createGzip, createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';

export async function performanceAnalysis() {
  fancyLog(`${green('-> Analyzing bundle performance...')}`);
  
  const stats = {
    css: {},
    js: {},
    images: {},
    total: {}
  };

  // Analyze CSS files
  try {
    const cssFiles = ['style.min.css', 'thanks.min.css'];
    for (const file of cssFiles) {
      const filePath = `${paths.styles.prod}${file}`;
      if (fs.existsSync(filePath)) {
        const originalSize = fs.statSync(filePath).size;
        const gzipSize = await getCompressedSize(filePath, 'gzip');
        const brotliSize = await getCompressedSize(filePath, 'brotli');
        
        stats.css[file] = {
          original: originalSize,
          gzip: gzipSize,
          brotli: brotliSize,
          gzipReduction: ((originalSize - gzipSize) / originalSize * 100).toFixed(1),
          brotliReduction: ((originalSize - brotliSize) / originalSize * 100).toFixed(1)
        };
      }
    }
  } catch (error) {
    fancyLog(`${red('CSS analysis failed:')} ${error.message}`);
  }

  // Analyze JS files
  try {
    const jsFiles = ['script.min.js', 'color-modes.min.js'];
    for (const file of jsFiles) {
      const filePath = `${paths.scripts.prod}${file}`;
      if (fs.existsSync(filePath)) {
        const originalSize = fs.statSync(filePath).size;
        const gzipSize = await getCompressedSize(filePath, 'gzip');
        const brotliSize = await getCompressedSize(filePath, 'brotli');
        
        stats.js[file] = {
          original: originalSize,
          gzip: gzipSize,
          brotli: brotliSize,
          gzipReduction: ((originalSize - gzipSize) / originalSize * 100).toFixed(1),
          brotliReduction: ((originalSize - brotliSize) / originalSize * 100).toFixed(1)
        };
      }
    }
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

async function getCompressedSize(filePath, compression) {
  const inputStream = createReadStream(filePath);
  let compressStream;
  
  if (compression === 'gzip') {
    compressStream = createGzip({ level: 9 });
  } else if (compression === 'brotli') {
    compressStream = createBrotliCompress({ 
      params: {
        [require('zlib').constants.BROTLI_PARAM_QUALITY]: 11
      }
    });
  }

  let size = 0;
  compressStream.on('data', (chunk) => {
    size += chunk.length;
  });

  await pipeline(inputStream, compressStream);
  return size;
}

async function analyzeImageOptimization() {
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
    const filePath = `${imageDir}/${file}`;
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

function printPerformanceReport(stats) {
  fancyLog('\n📊 Performance Analysis Report');
  fancyLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // CSS Report
  if (Object.keys(stats.css).length > 0) {
    fancyLog(`\n${cyan('📄 CSS Assets:')}`);
    for (const [file, data] of Object.entries(stats.css)) {
      fancyLog(`  ${file}:`);
      fancyLog(`    Original: ${formatBytes(data.original)}`);
      fancyLog(`    Gzip:     ${formatBytes(data.gzip)} (${data.gzipReduction}% reduction)`);
      fancyLog(`    Brotli:   ${formatBytes(data.brotli)} (${data.brotliReduction}% reduction)`);
    }
  }

  // JS Report
  if (Object.keys(stats.js).length > 0) {
    fancyLog(`\n${cyan('📦 JavaScript Assets:')}`);
    for (const [file, data] of Object.entries(stats.js)) {
      fancyLog(`  ${file}:`);
      fancyLog(`    Original: ${formatBytes(data.original)}`);
      fancyLog(`    Gzip:     ${formatBytes(data.gzip)} (${data.gzipReduction}% reduction)`);
      fancyLog(`    Brotli:   ${formatBytes(data.brotli)} (${data.brotliReduction}% reduction)`);
    }
  }

  // Images Report
  if (stats.images && stats.images.totalFiles > 0) {
    fancyLog(`\n${cyan('🖼️  Image Assets:')}`);
    fancyLog(`  Total files: ${stats.images.totalFiles}`);
    fancyLog(`  Total size:  ${formatBytes(stats.images.totalSize)}`);
    fancyLog(`  Average:     ${formatBytes(stats.images.averageSize)}`);
    
    if (stats.images.formats) {
      fancyLog(`  By format:`);
      for (const [format, data] of Object.entries(stats.images.formats)) {
        fancyLog(`    ${format.toUpperCase()}: ${data.count} files, ${formatBytes(data.size)}`);
      }
    }
  }

  // Performance Tips
  fancyLog(`\n${cyan('💡 Performance Tips:')}`);
  
  const totalCSSSize = Object.values(stats.css).reduce((sum, data) => sum + data.original, 0);
  const totalJSSize = Object.values(stats.js).reduce((sum, data) => sum + data.original, 0);

  if (totalCSSSize > 100000) {
    fancyLog(`  ${magenta('⚠️')} CSS bundle is large (${formatBytes(totalCSSSize)}). Consider further optimization.`);
  } else {
    fancyLog(`  ${green('✅')} CSS bundle size is optimized (${formatBytes(totalCSSSize)})`);
  }

  if (totalJSSize > 50000) {
    fancyLog(`  ${magenta('⚠️')} JS bundle is large (${formatBytes(totalJSSize)}). Consider code splitting.`);
  } else {
    fancyLog(`  ${green('✅')} JS bundle size is optimized (${formatBytes(totalJSSize)})`);
  }

  if (stats.images.formats && !stats.images.formats.webp && !stats.images.formats.avif) {
    fancyLog(`  ${magenta('⚠️')} Consider using modern image formats (WebP/AVIF) for better compression`);
  } else {
    fancyLog(`  ${green('✅')} Using modern image formats for optimal compression`);
  }

  fancyLog('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

performanceAnalysis.displayName = 'performance:analysis';
performanceAnalysis.description = 'Analyze bundle performance and optimization metrics';