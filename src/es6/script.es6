//
// Script
// ============================================================================
/* global lozad */

// Parallax plugin
// -----------------------------------------------------------------------------
(($) => {
  $.fn.parallax = function (options) {
    const $img = $(this),
          $imgParent = $img.parent(),
          $parentY = $imgParent.offset().top,
          $parentH = $imgParent.innerHeight()

    // Default settings
    const settings = $.extend({
      start: $parentY,
      height: $parentH,
      stop: $parentY + $parentH,
      speed: $img.data('speed') // + up, - down
    }, options )

    return this.each(() => {
      // Populate images from data attributes.
      // var imageSrc = $img.data('src');
      // var imageHeight = $img.data('height');
      // $(this).css('background-image','url(' + imageSrc + ')');
      // $(this).css('height', imageHeight);
      const o = settings

      function parallaxImg () {
        const $windowY = $(window).scrollTop(),
              $windowH = $(window).height()

        // The next pixel to show on screen
        const winBottom = $windowY + $windowH
        let imgPercent = ''

        // If block is shown on screen
        if (winBottom >= o.start && $windowY <= o.stop) {
          // Number of pixels shown after block appear
          let imgBottom = ((winBottom - o.start) * o.speed)
          // Max number of pixels until block disappear
          let imgTop = $windowH + o.height
          // Precentage between start showing until disappearing
          imgPercent = Math.round((imgBottom / imgTop) * 100) + (50 - (o.speed * 50))
        }

        $img.css({
          top: imgPercent + '%',
          transform: 'translate(-50%, -' + imgPercent + '%)'
        })
      }

      $(window).on('scroll', parallaxImg)
    })
  }
})(jQuery);

// Text Rotator
// -----------------------------------------------------------------------------
(($) => {
  $.fn.rotaterator = function (options) {
    const obj = $(this)
    const items = $(obj.children(), obj)

    // Default settings
    const settings = $.extend({
      fadeSpeed: 500,
      pauseSpeed: 3500,
      child: null
    }, options)

    return this.each(() => {
      const o = settings

      items.each(function () { $(this).hide() })
      let next
      if (!o.child) {
        next = $(obj).children(':first')
      } else {
        next = o.child
      }

      $(next).fadeIn(o.fadeSpeed, () => {
        $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
          let next = $(this).next()
          if (next.length == 0) {
            next = $(obj).children(':first')
          }
          $(obj).rotaterator({
            child: next,
            fadeSpeed: o.fadeSpeed,
            pauseSpeed: o.pauseSpeed
          })
        })
      })
    })
  }
})(jQuery)

// Picture observer with default `load` method
// -----------------------------------------------------------------------------
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

  // Text Rotate
  // ------------------------
  $('#rotate').rotaterator()

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
