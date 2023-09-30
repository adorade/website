// Color Modes Toggler
//
// Element to control the `data-bs-theme` attribute on the root element, `<html>`
//
// It's best to inline this in `<head>` to avoid FOUC (flash of unstyled content)
// when changing pages or themes. The reason we add this script to the `<head>`
// tag and not before the closing `<body>` tag is because we want to avoid a
// flicking effect when setting the page to dark or light mode.
// =============================================================================

(() => {
  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersColorScheme = () => prefersDarkMode.matches ? 'dark' : 'light'

  // Set default theme (dark)
  if (!getStoredTheme()) setStoredTheme('dark')

  // Get theme from user's preferred color scheme
  const getPreferredTheme = () => {
    if (getStoredTheme()) {
      return getStoredTheme()
    }

    return prefersColorScheme()
  }

  // Set theme to user's preferred color scheme
  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', prefersColorScheme())
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // Set theme on load
  setTheme(getPreferredTheme())

  // Show active theme in theme switcher
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#color-theme')

    if (!themeSwitcher) {
      return
    }

    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `Toggle theme (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  // Update theme when the preferred scheme changes
  prefersDarkMode.addEventListener('change', () => {
    if (!getStoredTheme()) showActiveTheme('auto')

    if (getStoredTheme() !== 'light' && getStoredTheme() !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  // Update on window load
  window.addEventListener('DOMContentLoaded', () => {
    // Update theme switcher
    showActiveTheme(getPreferredTheme())

    // Update theme on button click
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          // Add this class tactically a moment before changing the theme
          document.documentElement.classList.add('color-theme-in-transition')

          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)

          // Remove as soon as the transition was over
          setTimeout(() => {
            document.documentElement.classList.remove('color-theme-in-transition')
          }, 1000)
        })
      })
  })
})()
