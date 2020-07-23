//
// Lazy-load images
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const cardPictures = document.querySelectorAll('.card-picture')
  const featurePictures = [].slice.call(document.querySelectorAll('.lazy-features'))
  const topPictures = document.querySelectorAll('.lazy-top')

  topPictures.forEach(top => {
    top.parentNode.classList.add('fade-in')
  })

  if ('IntersectionObserver' in window) {
    let cardImageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let cardImage = entry.target
          cardImage.parentNode.classList.add('card-fade-in')
          cardImageObserver.unobserve(cardImage)
        }
      })
    }, {
      threshold: 0.3
    })

    let featImageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let featImage = entry.target
          featImage.parentNode.classList.add('fade-in')
          featImageObserver.unobserve(featImage)
        }
      })
    }, {
      threshold: 0.3
    })

    cardPictures.forEach(card => {
      cardImageObserver.observe(card)
    })

    featurePictures.forEach(feat => {
      featImageObserver.observe(feat)
    })
  } else {
    cardPictures.forEach(card => {
      card.parentNode.classList.add('card-fade-in')
    })

    featurePictures.forEach(feat => {
      feat.parentNode.classList.add('fade-in')
    })
  }

  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]')
    images.forEach(img => {
      img.src = img.dataset.src
    })
  } else {
    // Dynamically import the LazySizes library
    let script = document.createElement('script')
    script.async = true
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js'
    document.body.appendChild(script)
  }
})
