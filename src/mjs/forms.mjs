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
        // --- Stop form from submitting normally, handle the invalid form...
        event.preventDefault()
        event.stopPropagation()

        $(this).addClass('shake animated').one('animationend', function () {
          $(this).removeClass('shake animated')
        })
      } else {
        // --- Since form is now valid, prevent default behavior.
        event.preventDefault()

        // --- Get some values from elements on the page:
        let $form = $(this),
            url = $form.attr('action'),
            datas = $form.serialize(),
            $response = $form.parent().find('.form-response')

        // --- Message that will be displayed when everything is OK :)
        let okMessage
        if ( $form.attr('id') === 'news-form' ) {
          okMessage = 'We have sent an email to confirm your subscription to your email address. Thank you for subscribing!'
        } else {
          okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!'
        }

        // --- If something goes wrong, we will display this message. :(
        const errorMessage = 'There was an error while submitting the form. Please try again later'

        // --- Send the data using post
        $.post(url, datas)
          .done(() => {
            $response.addClass('alert-success').removeClass('d-none').append(okMessage)
          })
          .fail(() => {
            $response.addClass('alert-danger').removeClass('d-none').append(errorMessage)
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

            $('button:submit').blur()
            $form.removeClass('was-validated').trigger('reset')
          })
      }

      $(this).addClass('was-validated')
      $('button:submit').blur()
    })

    // --- Reset form
    $('button:reset').click(function () {
      $(form).removeClass('was-validated')
      $(this).blur()
    })
  })
})()
