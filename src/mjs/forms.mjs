//
// Form Submissions
// -----------------------------------------------------------------------------

// Disabling form submissions if there are invalid fields
// Note: Keep in mind that
// each <form> element must have the `novalidate` attribute and at the same time,
// each <input> element in it must have the `required` attribute.
// -----------------------------------------------------------------------------
window.addEventListener('load', () => {
  // --- Grab all the forms
  const forms = document.querySelectorAll('.needs-validation')
  // const modalQuote = document.querySelector('#modal-get-quote').closest('.modal-dialog')

  // --- Attach a submit handler to each form
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      // --- Check form validity
      if (!form.checkValidity()) {
        // --- Stop form from submitting normally, handle the invalid form...
        event.preventDefault()
        event.stopPropagation()

        // --- Add `shake` animation
        form.classList.add('shake-x', 'animated')
        form.addEventListener('animationend', () => {
          form.classList.remove('shake-x', 'animated')
        }, { once: true })

        // --- Change modal-dialog shadow
        // if (modalQuote) {
        //   console.log('EROOOOR')
        //   modalQuote.classList.add('modal-quote-error')
        // }
      } else {
        // --- Since the form is now valid, prevent the default behavior.
        event.preventDefault()

        // --- Get some values from elements on the page:
        const data = new URLSearchParams(new FormData(form))
        const response = form.parentElement.querySelector('.form-response')

        // --- Message that will be displayed when everything is OK :)
        let okMessage
        if (form.getAttribute('id') === 'news-form') {
          okMessage = 'We have sent an email to confirm your subscription to your email address. Thank you for subscribing!'
        } else {
          okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!'
        }

        // --- If something goes wrong, we will display this message. :(
        const errorMessage = 'There was an error while submitting the form. Please try again later'

        // --- Send the data using post
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: data.toString()
        })
          .then((result) => {
            if (result.ok) {
              return result.text()
            } else {
              throw new Error('Network response was not ok')
            }
          })
          .then(() => {
            response.classList.add('alert-success')
            response.classList.remove('d-none')
            response.textContent = okMessage
          })
          .catch(() => {
            response.classList.add('alert-danger')
            response.classList.remove('d-none')
            response.textContent = errorMessage
          })
          .finally(() => {
            setTimeout(() => {
              response.style.display = 'none'

              setTimeout(() => {
                if (response.classList.contains('alert-success') || response.classList.contains('alert-danger')) {
                  response.classList.remove('alert-success', 'alert-danger')
                  response.classList.add('d-none')
                  response.textContent = ''
                  response.removeAttribute('style')
                }
              }, 2000)
            }, 8000)

            // Trigger blur event on submit button
            var submitButton = form.querySelector('button[type="submit"]')
            if (submitButton) {
              submitButton.blur()
            }

            // Reset form
            form.classList.remove('was-validated')
            form.reset()
          })
      }

      // Add 'was-validated' class to the form
      form.classList.add('was-validated')

      // Trigger blur event on submit button
      const submitButton = form.querySelector('button[type="submit"]')
      if (submitButton) {
        submitButton.blur()
      }
    })

    // --- Reset form
    const resetButton = form.querySelector('button[type="reset"]')
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        form.classList.remove('was-validated')
        // if (modalQuote) {
        //   console.log('REMOVED')
        //   modalQuote.classList.remove('modal-quote-error')
        // }
        resetButton.blur()
      })
    }
  })
})
