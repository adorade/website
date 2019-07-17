//
// Picture observer with default `load` method
// -----------------------------------------------------------------------------
/* global lozad */

export const drawerObserver = lozad('.lozad-drawer', {
  threshold: 0.1,
  loaded (el) {
    el.classList.add('loaded')
  }
})

export const cardsObserver = lozad('.lozad-cards', {
  threshold: 0.1,
  loaded (el) {
    el.classList.add('loaded')

    // Show cards when picture is loaded
    $('.loaded').parent().removeClass('invisible').css('opacity', 1)
    $('.loaded').siblings('.card-img-overlay').removeClass('position-relative')
  }
})
