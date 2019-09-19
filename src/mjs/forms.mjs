//
// Forms
// ============================================================================
/* eslint-disable no-unused-vars */

// JavaScript for disabling form submissions if there are invalid fields
(() => {
  window.addEventListener('load', () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', (event) => {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  }, false)
})()

$(document).ready(() => {
  // Reset form
  $('button:reset').click(() => {
    $('.needs-validation')
      .removeClass('was-validated')
      .find('.form-control').val('')
  })
})
