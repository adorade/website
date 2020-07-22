//
// Lazy-load images
// -----------------------------------------------------------------------------


if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach(img => {
    img.src = img.dataset.src
  })

  const cardsPicture = document.querySelectorAll('.card-picture')
  cardsPicture.forEach(card => {
    card.parentNode.classList.add('card-fade-in')
  })

  const fadeImages = [].slice.call(document.querySelectorAll(
    '.lazy-top, .lazy-features'
  ))
  fadeImages.forEach(img => {
    img.parentNode.classList.add('fade-in')
  })
} else {
  // Dynamically import the LazySizes library
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js'
  document.body.appendChild(script)
}
