/*!
 * Adorade (v1.0.0): script.js
 * Web Design Company
 * Copyright (c) 2019 undefined (https://adorade.ro)
 * License under MIT (https://github.com/adorade/website/blob/master/LICENSE)
 * ============================================================================
 */
(function ($) {
  $.fn.parallax = function (options) {
    var $img = $(this),
        $imgParent = $img.parent(),
        $parentY = $imgParent.offset().top,
        $parentH = $imgParent.innerHeight();
    var settings = $.extend({
      start: $parentY,
      height: $parentH,
      stop: $parentY + $parentH,
      speed: $img.data('speed')
    }, options);
    return this.each(function () {
      function parallaxImg() {
        var $windowY = $(window).scrollTop(),
            $windowH = $(window).height();
        var winBottom = $windowY + $windowH;
        var imgPercent = '';

        if (winBottom >= settings.start && $windowY <= settings.stop) {
          var imgBottom = (winBottom - settings.start) * settings.speed;
          var imgTop = $windowH + settings.height;
          imgPercent = Math.round(imgBottom / imgTop * 100) + (50 - settings.speed * 50);
        }

        $img.css({
          top: imgPercent + '%',
          transform: 'translate(-50%, -' + imgPercent + '%)'
        });
      }

      $(window).on('scroll', parallaxImg);
    });
  };
})(jQuery);

var drawerObserver = lozad('.lozad-drawer', {
  threshold: 0.1,
  loaded: function loaded(el) {
    el.classList.add('loaded');
  }
});
var pictureObserver = lozad('.lozad-picture', {
  threshold: 0.1,
  loaded: function loaded(el) {
    el.classList.add('loaded');
    $('.loaded').parent().removeClass('invisible').css('opacity', 1);
    $('.loaded').siblings('.card-img-overlay').removeClass('position-relative');
  }
});
drawerObserver.observe();
pictureObserver.observe();
$('document').ready(function () {
  function heroHeight() {
    $('.hero-unit').innerHeight($(this).innerHeight());
  }

  heroHeight();

  function brandingLineHeight() {
    $('.branding').css('line-height', $('.hero-unit').height() + 'px');
  }

  brandingLineHeight();
  $(window).on('orientationchange resize', function () {
    heroHeight();
    brandingLineHeight();
  });
  $(window).scroll(function () {
    var $windowPos = $(this).scrollTop(),
        $windowH = $(this).height(),
        $documentH = $(document).height(),
        $toggler = $('.navbar-toggler'),
        $totop = $('.back-to-top'),
        $percent = $('.back-to-top-percent'),
        $hero = $('.hero-unit').height() - 1,
        scrollPos = $windowPos ? $windowPos : 0;

    if (scrollPos > $hero) {
      $toggler.addClass('btn-orange');
      $totop.filter(':hidden').stop(true, true).fadeIn();
    } else {
      $toggler.removeClass('btn-orange');
      $totop.stop(true, true).fadeOut();
    }

    var scrollProcent = 0;
    scrollProcent = 100 - Math.round(($documentH - $windowH - $windowPos) * 100 / ($documentH - $windowH));
    $percent.height(scrollProcent + '%');
  });
  $('.scroll-down').on('click', function () {
    $('html, body').animate({
      scrollTop: $('#cards').offset().top
    }, 1000);
  });
  $('#bg-parallax').parallax();
  $('.back-to-top-icon').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});
//# sourceMappingURL=maps/script.js.map