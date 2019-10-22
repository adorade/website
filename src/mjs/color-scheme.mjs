//
// Color Schema - css-prefers-color-scheme init
// -----------------------------------------------------------------------------
/* globals initPrefersColorScheme */

(() => {
  // this enables prefers-color-scheme media queries
  const colorScheme = initPrefersColorScheme('dark')

  const toggler = $('.btn-group-toggle input:radio')
  toggler.on('change', (event) => {
    // console.log('Your schema is: ' + event.target.value)
    const schema = event.target.value

    colorScheme.scheme = schema
  })

  // let’s run it now
  // colorScheme.onChange();
})()
