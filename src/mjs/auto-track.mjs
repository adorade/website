//
// Automatic Tracking Of Buttons and Links for analytics.js
//
// Function that automatically tracks a click on a link in Google Analytics,
// using the analytics.js. Setting the transport method to 'beacon' lets the hit be
// sent using 'navigator.sendBeacon' in browser that support it.
// https://support.google.com/analytics/answer/7478520?hl=en
// -----------------------------------------------------------------------------
/* globals ga */

$(function () {
  function handleInlineClicks (track, label) {
    // console.log('Label: ' + label + '\nTrack: ' + track)

    ga('send', 'event', {
      eventCategory: track,
      eventAction: 'click',
      eventLabel: label,
      transport: 'beacon'
    })
  }

  function handleOutboundLinkClicks (track, label) {
    // console.log('Label: ' + label + '\nTrack: ' + track)

    ga('send', 'event', {
      eventCategory: track,
      eventAction: 'click',
      eventLabel: label,
      transport: 'beacon'
    })
  }

  $('button').on('click', function () {
    let label = $(this).attr('aria-label')
    handleInlineClicks('button', label)
  })

  $('.card-link, .track-link').on('click', function () {
    let label = $(this).attr('aria-label')
    handleInlineClicks('link', label)
  })

  $('.scroll-down-icon, .back-to-top-icon').on('click', function () {
    let label = $(this).attr('aria-label')
    handleInlineClicks('misc', label)
  })

  $('.cc-message a, .cc-compliance a').on('click', function () {
    let label = $(this).attr('aria-label')
    handleInlineClicks('consent', label)
  })

  $('.outbound-link').on('click', function () {
    let track = $(this).attr('href')
    let label = $(this).attr('aria-label')
    handleOutboundLinkClicks(track, label)
  })
})
