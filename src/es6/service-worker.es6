//
// Register Service Worker
// -----------------------------------------------------------------------------

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // Registration was successful :D
      console.log('ServiceWorker registration successful with scope: ', reg.scope)
    }, (err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}
