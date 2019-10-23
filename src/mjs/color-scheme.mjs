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
    console.log('Your current theme is: ' + currentTheme)
    colorScheme.scheme = currentTheme

    if (currentTheme === 'light') {
      $toggler.first().parent().removeClass('active')
      $toggler.last().parent().addClass('active')
    }
  }

  // Switch theme function
  function switchTheme (event) {
    console.log( $( this ).val() )
    console.log('Your schema is: ' + event.target.value)
    const schema = event.target.value

    // Change color schema
    colorScheme.scheme = schema

    // Store the user preference for future visits
    localStorage.setItem('theme', schema)
  }

  // Event handlers on change
  $toggler.change(switchTheme)

  // let’s run it now
  // colorScheme.onChange();
})()
