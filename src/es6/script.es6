//
// Script
// ============================================================================
/* global lozad */

// Parallax plugin
// ------------------------
(function ($) {
  $.fn.parallax = function (options) {
    const $img = $(this),
          $imgParent = $img.parent(),
          $parentY = $imgParent.offset().top,
          $parentH = $imgParent.innerHeight()

    // Default settings
    const settings = $.extend ({
      start: $parentY,
      height: $parentH,
      stop: $parentY + $parentH,
      speed: $img.data('speed') // + up, - down
    }, options )

    return this.each(function () {
      // Populate images from data attributes.
      // var imageSrc = $img.data('src');
      // var imageHeight = $img.data('height');
      // $(this).css('background-image','url(' + imageSrc + ')');
      // $(this).css('height', imageHeight);

      function parallaxImg () {
        const $windowY = $(window).scrollTop(),
              $windowH = $(window).height()

        // The next pixel to show on screen
        const winBottom = $windowY + $windowH
        let imgPercent = ''

        // If block is shown on screen
        if (winBottom >= settings.start && $windowY <= settings.stop) {
          // Number of pixels shown after block appear
          let imgBottom = ((winBottom - settings.start) * settings.speed)
          // Max number of pixels until block disappear
          let imgTop = $windowH + settings.height
          // Precentage between start showing until disappearing
          imgPercent = Math.round((imgBottom / imgTop) * 100) + (50 - (settings.speed * 50))
        }

        $img.css({
          top: imgPercent + '%',
          transform: 'translate(-50%, -' + imgPercent + '%)'
        })
      }

      $(window).on('scroll', parallaxImg)
    })
  }
}(jQuery))

// Picture observer with default `load` method
const drawerObserver = lozad('.lozad-drawer', {
  threshold: 0.1,
  loaded: function (el) {
    el.classList.add('loaded')
  }
})
const pictureObserver = lozad('.lozad-picture', {
  threshold: 0.1,
  loaded: function (el) {
    el.classList.add('loaded')

    // Show cards when picture is loaded
    $('.loaded').parent().removeClass('invisible').css('opacity', 1)
    $('.loaded').siblings('.card-img-overlay').removeClass('position-relative')
  }
})
drawerObserver.observe()
pictureObserver.observe()

$('document').ready(function () {
  // Prepare hero height
  // ------------------------
  function heroHeight () {
    // $('.hero-unit').height($(window).height());
    $('.hero-unit').innerHeight( $(this).innerHeight() )
  }
  heroHeight()

  // Re-Set on orientation change and window resize
  // ------------------------
  $(window).on('orientationchange resize', function () {
    heroHeight()
  })

  // Window Scroll
  // ------------------------
  $(window).scroll(function () {
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

  // Parallax Effect
  // ------------------------
  $('#bg-parallax').parallax()

  // Back to Top
  // ------------------------
  $('.back-to-top-icon').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000)
    return false
  })
})
