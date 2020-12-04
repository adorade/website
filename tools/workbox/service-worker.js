/*!
 * Adorade (v1.0.0): tools/workbox/service-worker.js
 * Copyright (c) 2018 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * =============================================================================
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */
/* globals importScripts, workbox */

// Import workbox-sw, which defines the global `workbox` object.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// Force production builds, set to `false` for localhost
// workbox.setConfig({ debug: false });

// Workbox modules and plugins
const { cleanupOutdatedCaches, precacheAndRoute} = workbox.precaching;
const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

if (workbox) {
  console.log('Yay! Workbox is loaded');

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  precacheAndRoute(self.__WB_MANIFEST);
  cleanupOutdatedCaches();

  // Caching Images for 7 days
  registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
        })
      ]
    })
  );
} else {
  console.log("Boo! Workbox didn't load");
}
