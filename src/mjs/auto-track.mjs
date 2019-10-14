//
// Automatic Tracking Of Buttons and internal Links for gtags.js
//
// Function that automatically tracks a click on a button in Google Analytics,
// using the gtags.js. Setting the transport method to 'beacon' lets the hit be
// sent using 'navigator.sendBeacon' in browser that support it.
// https://support.google.com/analytics/answer/7478520?hl=en
// -----------------------------------------------------------------------------
/* globals gtag */

$(function () {
  function trackClick (track, label) {
    // console.log('Label: ' + label + '\nTrack: ' + track)

    gtag('event', 'click', {
      'event_category': track,
      'event_label': label,
      'transport_type': 'beacon'
    })
  }

  $('button').on('click', function () {
    let label = $(this).attr('aria-label')
    trackClick('button', label)
  })

  $('.card-link, .track-link').on('click', function () {
    let label = $(this).attr('aria-label')
    trackClick('link', label)
  })

  $('.scroll-down-icon, .back-to-top-icon').on('click', function () {
    let label = $(this).attr('aria-label')
    trackClick('misc', label)
  })

  $('.cc-message a, .cc-compliance a').on('click', function () {
    let label = $(this).attr('aria-label')
    trackClick('consent', label)
  })
})
