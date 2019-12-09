//
// Lazy-load images
// -----------------------------------------------------------------------------
/* globals yall */

document.addEventListener('DOMContentLoaded', () => {
  const yallClasses = ['lazy-parallax', 'lazy-drawer', 'lazy-carousel']
  const pictureClasses = ['lazy-top', 'lazy-services', 'lazy-info', 'lazy-portfolio']

  yall({
    lazyClass: 'lazy-cards',
    threshold: 0,
    events: {
      load: (event) => {
        if (!event.target.classList.contains('lazy-cards') && event.target.nodeName == 'IMG') {
          event.target.classList.add('yall-loaded')
          event.target.parentNode.parentNode.classList.add('card-fade-in')
        }
      }
    }
  })

  for (let value of Object.keys(pictureClasses)) {
    yall({
      lazyClass: pictureClasses[value],
      threshold: -50,
      events: {
        load: (event) => {
          if (!event.target.classList.contains(pictureClasses[value]) && event.target.nodeName == 'IMG') {
            event.target.classList.add('yall-loaded')
            event.target.parentNode.classList.add('fade-in')
          }
        }
      }
    })
  }

  for (let value of Object.keys(yallClasses)) {
    yall({
      lazyClass: yallClasses[value],
      events: {
        load: (event) => {
          if (!event.target.classList.contains(yallClasses[value]) && event.target.nodeName == 'IMG') {
            event.target.classList.add('yall-loaded')
          }
        }
      }
    })
  }
})
