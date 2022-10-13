/*!
 * Adorade (v1.0.0): tools/rollup/index.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { rollup } from 'rollup';
import { Transform } from 'stream';
import { relative, join, basename, extname } from 'path';
import PluginError from 'plugin-error';
import File from 'vinyl';
import applySourceMap from 'vinyl-sourcemaps-apply';

const PLUGIN_NAME = 'gulp-rollup-bundler';

// Map object storing rollup cache objects for each input file
let rollupCache = {};
let inputOptions;
let bundleList;

function parseBundles (arg) {
  if (typeof arg == 'string') return [{ format: arg }];
  if (arg instanceof Array) return arg;
  return [arg];
}

function assignCertainProperties (toObject, fromObject, properties = []) {
  for (let key of properties) {
    if (toObject[key] === undefined && fromObject[key] !== undefined)
      toObject[key] = fromObject[key];
  }
}

// Transformer class
class GulpRollup extends Transform {
  constructor (opts) {
    super({ ...opts, objectMode: true });
  }

  _transform (file, encoding, cb) {
    // Check rollup reference
    if (typeof rollup === 'undefined') {
      return cb(new PluginError({
        plugin: PLUGIN_NAME,
        message: `${PLUGIN_NAME} require rollup. You need to install rollup.`,
        showProperties: false
      }));
    }

    // Cannot handle empty or unavailable files
    if (file.isNull()) {
      return cb(null, file);
    }

    // Cannot handle streams
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    // Create input object from `arg`
    if (this.arg2) {
      inputOptions = Object.assign({}, this.arg1);
      bundleList = parseBundles(this.arg2);
    } else {
      inputOptions = {};
      bundleList = parseBundles(this.arg1);
    }

    // User should not specify the input file path, but let him if he insists for some reason
    if (inputOptions.input === undefined) {
      // Determine input from file filename
      inputOptions.input = relative(file.cwd, file.path);
    } else {
      // Rename file if input is given
      file.path = join(file.cwd, inputOptions.input);
    }

    // Caching is enabled by default because of the nature of gulp and the watching/recompilation
    // but can be disabled by setting 'cache' to false
    if (inputOptions.cache !== false) {
      inputOptions.cache = rollupCache[inputOptions.input] || null;
    }

    // Enable sourcemap if gulp sourcemaps is enabled
    const createSourceMap = file.sourceMap !== undefined;

    const originalCwd = file.cwd;
    const originalPath = file.path;
    const moduleName = basename(file.path, extname(file.path));

    function generateAndApplyBundle (bundle, outputOptions, targetFile) {
      // Copying convenience objects and properties
      // from `inputOptions` to `outputOptions` (if not defined)
      // see: https://rollupjs.org/guide/en/#outputoptions-object
      const propsToCopy = [
        // core output options
        'dir', 'file', 'format', 'globals', /*'name', 'plugins',*/

        // advanced output options
        'assetFileNames', 'banner', 'chunkFileNames', 'compact', 'entryFileNames', 'extend',
        'externalLiveBindings', 'footer', 'hoistTransitiveImports', 'inlineDynamicImports',
        'interop', 'intro', 'manualChunks', 'minifyInternalExports', 'outro', 'paths',
        'preserveModules', 'preserveModulesRoot', 'sourcemap', 'sourcemapExcludeSources',
        'sourcemapFile', 'sourcemapPathTransform', 'validate',

        // danger zone
        /*'amd',*/ 'esModule', 'exports', 'freeze', 'indent', 'namespaceToStringTag',
        'noConflict', 'preferConst', 'sanitizeFileName', 'strict', 'systemNullSetters'
      ];

      assignCertainProperties(outputOptions, inputOptions, propsToCopy);

      // Rollup won't bundle iife and umd modules without module name.
      // But it won't say anything either, leaving a space for confusion
      if (outputOptions.name === undefined) {
        outputOptions.name = inputOptions.name || moduleName;
      }

      // Leave blank for anonymous module
      if (outputOptions.amd === undefined || outputOptions.amd.id === undefined) {
        outputOptions.amd = Object.assign({}, outputOptions.amd, { id: outputOptions.name });
      }

      // Enable sourcemap
      outputOptions.sourcemap = createSourceMap;

      // Generate bundle according to given or autocompleted options
      return bundle.generate(outputOptions).then(result => {
        if (result === undefined) return;

        const output = result.output[0];

        // Pass sourcemap content and metadata to gulp sourcemaps to handle
        // destination (and custom name) was given, possibly multiple output bundles.
        if (createSourceMap) {
          output.map.file = relative(originalCwd, originalPath);
          output.map.sources = output.map.sources.map(source => relative(originalCwd, source));
        }

        // Return bundled file as buffer
        targetFile.contents = Buffer.from(output.code);

        // Apply sourcemap to output file
        if (createSourceMap) applySourceMap(targetFile, output.map);
      });
    }

    const createBundle = (bundle, outputOptions, injectNewFile) => {
      // Custom output name might be set
      if (outputOptions.file) {
        // Setup filename name from outputOptions.file
        const newFileName = basename(outputOptions.file);
        const newFilePath = join(file.base, newFileName);

        if (injectNewFile) {
          // Create new file and inject it into stream if needed (in case of multiple outputs)
          const newFile = new File({
            cwd: file.cwd,
            base: file.base,
            path: newFilePath,
            stat: {
              isFile: () => true,
              isDirectory: () => false,
              isBlockDevice: () => false,
              isCharacterDevice: () => false,
              isSymbolicLink: () => false,
              isFIFO: () => false,
              isSocket: () => false
            }
          });
          return generateAndApplyBundle(bundle, outputOptions, newFile)
            .then(result => {
              this.push(newFile);
              return result;
            });
        } else {
          // Rename original file
          file.path = newFilePath;
          return generateAndApplyBundle(bundle, outputOptions, file);
        }
      } else {
        // File wasn't renamed nor new one was created,
        // apply data and sourcemaps to the original file
        return generateAndApplyBundle(bundle, outputOptions, file);
      }
    };

    // Pass basic options to rollup
    rollup(inputOptions)

      // After the magic is done, configure the output format
      .then(bundle => {
        // Cache rollup object if caching is enabled
        if (inputOptions.cache !== false)
          rollupCache[inputOptions.input] = bundle;

        // Generate ouput according to (each of) given outputOptions
        return Promise.all(bundleList.map(
          (outputOptions, i) => createBundle(bundle, outputOptions, i)
        ));
      })

      // Pass file to gulp and end stream
      .then(() => cb(null, file))

      // Catch the `error`
      .catch(err => {
        if (inputOptions.cache !== false)
          rollupCache[inputOptions.input] = null;

        process.nextTick(() => {
          this.emit('error', new PluginError({
            plugin: PLUGIN_NAME,
            message: err
          }));
          cb(null, file);
        });
      });
  }
}

// First argument (inputOptions) is optional
export default function factory (arg1, arg2) {
  // Instantiate the stream class
  const stream = new GulpRollup();

  // Pass in options objects
  stream.arg1 = arg1;
  stream.arg2 = arg2;

  // Return the stream instance
  return stream;
}
