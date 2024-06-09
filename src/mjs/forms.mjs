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

  // --- Attach a submit handler to each form
  forms.forEach(form => {
    form.addEventListener('submit', event => {
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
          .then(response => {
            if (response.ok) {
              return response.text()
            } else {
              throw new Error('Network response was not ok')
            }
          })
          .then(() => {
            response.classList.add('alert-success')
            response.textContent = okMessage
            response.classList.remove('d-none')
          })
          .catch(() => {
            response.classList.add('alert-danger')
            response.textContent = errorMessage
            response.classList.remove('d-none')
          })
          .finally(() => {
            // --- Remove form alert
            setTimeout(() => {
              response.style.display = 'none'

              setTimeout(() => {
                if (
                  response.classList.contains('alert-success') ||
                  response.classList.contains('alert-danger')
                ) {
                  response.classList.add('d-none')
                  response.removeAttribute('style')
                  response.classList.remove('alert-success', 'alert-danger')
                  response.textContent = ''
                }
              }, 1000)
            }, 8000)

            // --- Reset form
            form.classList.remove('was-validated')
            form.reset()
          })
      }

      // --- Add 'was-validated' class to the form
      form.classList.add('was-validated')

      // --- Trigger blur event on submit button
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
        resetButton.blur()
      })
    }
  })
})
