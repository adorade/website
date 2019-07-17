// Lazy-load images
// -----------------------------------------------------------------------------
/* globals yall */
document.addEventListener('DOMContentLoaded', () => {
  yall({
    lazyClass: 'lazy-cards',
    threshold: 0,
    events: {
      load: function (event) {
        if (!event.target.classList.contains('lazy-cards') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
          event.target.parentNode.parentNode.style.opacity = '1'
          event.target.parentNode.parentNode.classList.replace('invisible', 'visible')
        }
      }
    }
  })
  yall({
    lazyClass: 'lazy-parallax',
    events: {
      load: function (event) {
        if (!event.target.classList.contains('lazy-parallax') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
        }
      }
    }
  })
  yall({
    lazyClass: 'lazy-drawer',
    events: {
      load: function (event) {
        if (!event.target.classList.contains('lazy-drawer') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
        }
      }
    }
  })
})
