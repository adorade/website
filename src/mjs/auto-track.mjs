//
// Automatic Tracking Of Buttons and Links for gtag.js
//
// https://support.google.com/analytics/answer/7478520?hl=en
// -----------------------------------------------------------------------------
/* globals gtag */

$(function () {
  function getOutboundLink (event) {
    let category = event.data.name,
        label = $(this).attr('aria-label')
    // console.log('Track: ' + category + '\nLabel: ' + label)

    gtag('event', 'click', {        // action => 'click'
      'event_category': category,   // 'outbound'
      'event_label': label,
      'transport_type': 'beacon'
    })
  }

  // Internal, on page
  $('button, .scroll-down-icon, .back-to-top-icon, .input-dark, .input-light, .carousel-control-prev, .carousel-control-next')
    .on('click', { name: 'internal' }, getOutboundLink)
  $('.cc-message a, .cc-compliance a')
    .on('click', { name: 'consent'}, getOutboundLink)

  // Internal, navigation
  $('.nav-link, .card-link, .track-link, .back-link')
    .on('click', { name: 'navigation' }, getOutboundLink)

  // External
  $('.external-link').on('click', { name: 'portfolio'}, getOutboundLink)
  $('.social-link').on('click', { name: 'social'}, getOutboundLink)
})
