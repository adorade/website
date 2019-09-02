//
// Text Rotator plugin
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
