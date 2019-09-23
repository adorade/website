//
// AJAX Form Submissions
// ============================================================================

// Disabling form submissions if there are invalid fields
// Note: Keep in mind that
// each <form> element must have the `novalidate` attribute and at the same time,
// each <input> element in it must have the `required` attribute.
// -----------------------------------------------------------------------------
(() => {
  $(window).on('load', () => {

    // --- Grab all the forms
    let form = $('.needs-validation')

    // --- Attach a submit handler to the form
    $(form).submit(function (event) {

      // --- Check form validity
      if (this.checkValidity() == false) {
        // --- Stop form from submitting normally
        event.preventDefault()
        event.stopPropagation()

        console.log('Bootstrap will handle incomplete form fields')
      } else {
        // --- Since form is now valid, prevent default behavior..
        event.preventDefault()

        // console.info('All form fields are now valid...')

        // --- Get some values from elements on the page:
        const $form = $(this),
              url = $form.attr('action'),
              datas = $form.serialize(),
              $response = $form.parent().find('.form-response')

        // --- Message that will be displayed when everything is OK :)
        let okMessage
        if ( $form.attr('id') === 'news-form' ) {
          okMessage = 'Newsletter form successfully submitted. Thank you, I will get back to you soon!'
        } else {
          okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!'
        }

        // --- If something goes wrong, we will display this message. :(
        const errorMessage = 'There was an error while submitting the form. Please try again later'

        // --- Send the data using post
        $.post(url, datas)
          // .then(() => {
          //   console.info('Your form are submitted...')
          //   console.log(`Sample of data: ${datas}`)
          // })
          .done(() => {
            $response.addClass('alert-success').removeClass('d-none').append(okMessage)
            // console.log('done log')
          })
          .fail(() => {
            $response.addClass('alert-danger').removeClass('d-none').append(errorMessage)
            // console.log('error log')
          })
          .always(() => {
            setTimeout(() => {
              $response.fadeOut()

              setTimeout(() => {
                if ( $response.hasClass('alert-success') || $response.hasClass('alert-danger') ) {
                  $response
                    .removeClass('alert-success alert-danger')
                    .addClass('d-none').removeAttr('style').empty()
                }
              }, 1000)
            }, 8000)

            $form.removeClass('was-validated').trigger('reset')
            // console.log('complete log')
          })

        // Send the event to Google Analytics and
        // resubmit the form once the hit is done.
        // gtag('event', 'signup_form_complete', {
        //   'event_callback': () => {
        //     $(form).submit()
        //   }
        // })
      }

      $(this).addClass('was-validated')
    })

    // --- Reset form
    $('button:reset').click(() => {
      $(form)
        .removeClass('was-validated')
        // .find('.form-control').val('')
    })
  })
})()
