//
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
          top: `${imgPercent}%`,
          transform: `translate(-50%, -${imgPercent}%)`
        })
      }

      $(window).on('load scroll resize', parallaxImg)
    })
  }
})(jQuery)
