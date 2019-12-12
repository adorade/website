//
// Color Schema - css-prefers-color-scheme init
// -----------------------------------------------------------------------------
/* globals initPrefersColorScheme */

(() => {
  // This enables prefers-color-scheme media queries
  const colorScheme = initPrefersColorScheme('dark')

  // Toggle selector and currnt theme constant
  const $toggler = $('.btn-group-toggle input:radio')
  const currentTheme = localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : null

  // Check for saved user preference, if any, on load of the website
  if (currentTheme) {
    colorScheme.scheme = currentTheme

    if (currentTheme === 'dark') {
      $('.input-dark').prop({checked: true})
    }

    if (currentTheme === 'light') {
      $('.input-light').prop({checked: true})
    }
  } else {
    $('.input-dark').prop({checked: true})
    localStorage.setItem('theme', 'dark')
  }

  // Switch theme function
  function switchTheme (event) {
    const schema = event.target.value

    // Add this class tactically a moment before changing the theme
    $('html').addClass('color-theme-in-transition')

    // Change color schema
    colorScheme.scheme = schema

    // Remove as soon as the transition was over
    setTimeout(() => {
      $('html').removeClass('color-theme-in-transition')
    }, 1000)

    // Store the user preference for future visits
    localStorage.setItem('theme', schema)
  }

  // Event handlers on change
  $toggler.change(switchTheme)

  // let’s run it now
  // colorScheme.onChange();
})()
