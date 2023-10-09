//
// Document ready
// =============================================================================

// Prepare hero height on load and reset on resize
// -----------------------------------------------------------------------------
window.onload = window.onresize = () => {
  const heroUnit = document.querySelector('.hero-unit')
  if (heroUnit)
    heroUnit.style.height = window.innerHeight + 'px'
}

// On Document Ready
// -----------------------------------------------------------------------------
function ready (fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

// Scroll to Next section
// -----------------------------------------------------------------------------
ready(() => {
  const scrollDown = document.querySelector('.scroll-down')

  if (scrollDown)
    scrollDown.onclick = () => {
      const targetElement = document.querySelector('#cards')
      const targetOffset = targetElement.offsetTop

      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      })
    }
})

// Back to Top
// -----------------------------------------------------------------------------
ready(() => {
  document.querySelector('.back-to-top-icon').onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})

// On Window Scroll
// -----------------------------------------------------------------------------
window.onscroll = () => {
  const windowPos = window.scrollY,
        windowH = window.innerHeight,
        documentH = document.documentElement.scrollHeight,
        scrollPos = windowPos ? windowPos : 0,

        togglers = document.querySelectorAll('.btn-toggler'),
        getInTouch = document.querySelector('.get-in-touch'),
        hero = document.querySelector('.hero-unit'),
        masthead = document.querySelector('.masthead'),
        totop = document.querySelector('.back-to-top'),
        percent = document.querySelector('.back-to-top-percent')

  let heroH, mastheadH
  if (hero) heroH = hero.clientHeight - 1
  if (masthead) mastheadH = masthead.clientHeight - 1

  const fadeIn = (el, smooth = true, displayStyle = 'block') => {
    el.style.opacity = 0
    el.style.display = displayStyle

    if (smooth) {
      let opacity = 0
      let request

      const animation = () => {
        opacity += 0.04
        if (opacity >= 1) {
          opacity = 1
          cancelAnimationFrame(request)
        }
        el.style.opacity = opacity
      }

      const rAf = () => {
        request = requestAnimationFrame(rAf)
        animation()
      }

      rAf()

    } else {
      el.style.opacity = 1
    }
  }

  const fadeOut = (el, smooth = true, displayStyle = 'none') => {
    if (smooth) {
      let opacity = el.style.opacity
      let request

      const animation = () => {
        opacity -= 0.04
        if (opacity <= 0) {
          opacity = 0
          cancelAnimationFrame(request)
        }
        el.style.opacity = opacity
        el.style.display = displayStyle
      }

      const rAf = () => {
        request = requestAnimationFrame(rAf)
        animation()
      }

      rAf()

    } else {
      el.style.opacity = 0
      el.style.display = displayStyle
    }
  }

  if (scrollPos > heroH || scrollPos > mastheadH) {
    togglers.forEach((toggler) => {
      toggler.classList.add('btn-orange')
    })
    getInTouch.classList.add('shrink')
    if (totop.style.display !== 'block') {
      fadeIn(totop)
    }
  } else {
    togglers.forEach((toggler) => {
      toggler.classList.remove('btn-orange')
    })
    getInTouch.classList.remove('shrink')
    if (totop.style.display !== 'none') {
      fadeOut(totop)
    }
  }

  let scrollPercent = 0
  scrollPercent = 100 - Math.round(
    ((documentH - windowH - windowPos) * 100) /
    (documentH - windowH))
  percent.style.height = scrollPercent + '%'
}
