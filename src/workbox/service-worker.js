/**
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

// Import workbox-sw, which defines the global `workbox` object.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log('Yay! Workbox is loaded')

  // Force production builds, set to false
  workbox.setConfig({ debug: false })

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precaching.precacheAndRoute([])

  // Enable Offline Google Analytics
  workbox.googleAnalytics.initialize()

  // Cache the Google Fonts webfont files with a CacheFirst strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-stylesheets',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        })
      ]
    })
  )

  // Caching Images
  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        })
      ]
    })
  )
} else {
  console.log("Boo! Workbox didn't load")
}
