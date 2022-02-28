//
// Color Schema - init (dark is default)
// -----------------------------------------------------------------------------

(() => {
  // --- Dark Theme is default
  let themeScheme = 'dark'
  const colorScheme = document.documentElement
  const meta = document.querySelector('meta[name="color-scheme"]')

  // --- Toggle selector and current theme constant
  const currentTheme = localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : null

  // --- Check for saved user preference, if any, on load of the website
  if (currentTheme) {
    colorScheme.setAttribute('color-scheme', currentTheme)
    meta.content = currentTheme

    if (currentTheme === 'dark') {
      $('.input-dark').prop({checked: true})
    }

    if (currentTheme === 'light') {
      $('.input-light').prop({checked: true})
    }

  // --- Set Dark as default theme
  } else {
    colorScheme.setAttribute('color-scheme', themeScheme)
    meta.content = themeScheme
    $('.input-dark').prop({checked: true})
    localStorage.setItem('theme', themeScheme)
  }

  // --- Switch theme function
  function switchTheme (event) {
    const schema = event.target.value

    // Add this class tactically a moment before changing the theme
    $('html').addClass('color-theme-in-transition')

    // Change color schema
    colorScheme.setAttribute('color-scheme', schema)
    meta.content = schema

    // Remove as soon as the transition was over
    setTimeout(() => {
      $('html').removeClass('color-theme-in-transition')
    }, 1000)

    // Store the user preference for future visits
    localStorage.setItem('theme', schema)
  }

  // --- Toogle selector, event handlers on change
  const $toggler = $('.btn-theme-toggle input:radio')
  $toggler.on('change', switchTheme)
})()
