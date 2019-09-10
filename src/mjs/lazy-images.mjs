// Lazy-load images
// -----------------------------------------------------------------------------
/* globals yall */

const yallClasses = ['lazy-parallax', 'lazy-drawer', 'lazy-carousel', 'lazy-portfolio']

document.addEventListener('DOMContentLoaded', () => {
  yall({
    lazyClass: 'lazy-cards',
    threshold: 0,
    events: {
      load: function (event) {
        if (!event.target.classList.contains('lazy-cards') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
          event.target.parentNode.parentNode.classList.add('card-fade-in')
        }
      }
    }
  })

  yall({
    lazyClass: 'lazy-top',
    events: {
      load: function (event) {
        if (!event.target.classList.contains('lazy-top') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
          event.target.parentNode.classList.add('top-fade-in')
        }
      }
    }
  })

  for (let value of Object.keys(yallClasses)) {
    yall({
      lazyClass: yallClasses[value],
      events: {
        load: function (event) {
          if (!event.target.classList.contains(yallClasses[value]) && event.target.nodeName == 'IMG') {
            event.target.classList.add('yall-loaded')
          }
        }
      }
    })
  }
})
