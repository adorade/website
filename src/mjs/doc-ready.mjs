//
// Document ready
// -----------------------------------------------------------------------------

$('document').ready(function () {
  // Prepare hero height
  // ------------------------
  function heroHeight () {
    $('.hero-unit').innerHeight( $(window).innerHeight() )
  }
  heroHeight()

  // Re-Set on orientation change and window resize
  // ------------------------
  $(window).on('orientationchange resize', function () {
    heroHeight()
  })

  // Window Scroll
  // ------------------------
  $(window).on('scroll', function () {
    // prettier-ignore
    const $windowPos = $(this).scrollTop(),
          $windowH = $(this).height(),
          $documentH = $(document).height(),
          $toggler = $('.navbar-toggler'),
          $totop = $('.back-to-top'),
          $percent = $('.back-to-top-percent'),
          $hero = $('.hero-unit').height() - 1,
          scrollPos = $windowPos ? $windowPos : 0

    if (scrollPos > $hero) {
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

  // Scroll to Cards section
  // ------------------------
  $('.scroll-down').on('click', function () {
    $('html, body').animate({
      // scrollTop: $('#cards').offset().top - 56 // value for .fixed-top
      scrollTop: $('#cards').offset().top
    }, 1000)
  })

  // Text Rotate
  // ------------------------
  $('#rotate').rotaterator()

  // Parallax Effect
  // ------------------------
  $('.parallax-img').parallax()

  // Back to Top
  // ------------------------
  $('.back-to-top-icon').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000)
    return false
  })
})
