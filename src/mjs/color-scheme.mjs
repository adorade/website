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

  // Check for saved user preference, if any, on load of the website
  if (currentTheme) {
    colorScheme.scheme = currentTheme

    if (currentTheme === 'light') {
      $toggler.first().parent().removeClass('active')
      $toggler.last().parent().addClass('active')
    }
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
