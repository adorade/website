//
// Document ready
// =============================================================================

// Prepare hero height and reset on orientation change and window resize
// -----------------------------------------------------------------------------
$(window).on('load orientationchange resize', () => {
  $('.hero-unit').height( $(window).height() )
})

// On Document Ready
// -----------------------------------------------------------------------------
$(() => {
  // Text Rotate
  // ------------------------
  $('.hero-desc').rotaterator()

  // Parallax Effect
  // ------------------------
  $('.parallax-img').parallax()

  // Scroll to Cards section
  // ------------------------
  $('.scroll-down').on('click', () => {
    $('html, body').animate({
      // scrollTop: $('#cards').offset().top - 56 // value for .fixed-top
      scrollTop: $('#cards').offset().top
    }, 1000)
  })

  // Back to Top
  // ------------------------
  $('.back-to-top-icon').on('click', () => {
    $('html, body').animate({
      scrollTop: 0
    }, 1000)
  })
})

// On Window Scroll
// -----------------------------------------------------------------------------
$(window).on('scroll', function () {
  const $windowPos = $(this).scrollTop(),
        $windowH = $(this).height(),
        $documentH = $(document).height(),
        $toggler = $('.navbar-toggler'),
        $totop = $('.back-to-top'),
        $percent = $('.back-to-top-percent'),
        $hero = $('.hero-unit').height() - 1,
        $masthead = $('.masthead').height() - 1,
        scrollPos = $windowPos ? $windowPos : 0

  if (scrollPos > $hero || scrollPos > $masthead) {
    $toggler.addClass('btn-orange')
    $totop.filter(':hidden').stop(true, true).fadeIn()
  } else {
    $toggler.removeClass('btn-orange')
    $totop.stop(true, true).fadeOut()
  }

  let scrollProcent = 0
  scrollProcent = 100 - Math.round(
    (($documentH - $windowH - $windowPos) * 100) /
    ($documentH - $windowH)
  )
  $percent.height(scrollProcent + '%')
})
