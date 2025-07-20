//
// Lazy-load images - Performance Optimized
// -----------------------------------------------------------------------------

// Use modern intersection observer with performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Get elements for lazy loading
  const cardPictures = document.querySelectorAll('.card-picture');
  const featurePictures = document.querySelectorAll('.lazy-features');
  const topPictures = document.querySelectorAll('.lazy-top');

  // Pre-fade top pictures
  topPictures.forEach(top => {
    top.parentNode?.classList.add('fade-in');
  });

  // Check for intersection observer support
  if ('IntersectionObserver' in window) {
    // Optimize intersection observer configuration
    const observerConfig = {
      threshold: 0.1, // Reduced threshold for faster loading
      rootMargin: '50px 0px', // Load images 50px before they come into view
    };

    // Card image observer
    const cardImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardImage = entry.target;
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            cardImage.parentNode?.classList.add('card-fade-in');
          });
          cardImageObserver.unobserve(cardImage);
        }
      });
    }, observerConfig);

    // Feature image observer
    const featImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const featImage = entry.target;
          requestAnimationFrame(() => {
            featImage.parentNode?.classList.add('fade-in');
          });
          featImageObserver.unobserve(featImage);
        }
      });
    }, observerConfig);

    // Observe elements
    cardPictures.forEach(card => cardImageObserver.observe(card));
    featurePictures.forEach(feat => featImageObserver.observe(feat));

  } else {
    // Fallback for browsers without intersection observer
    // Use a more performant approach with requestAnimationFrame
    const applyFadeIn = (elements, className) => {
      let index = 0;
      const applyNext = () => {
        if (index < elements.length) {
          elements[index].parentNode?.classList.add(className);
          index++;
          requestAnimationFrame(applyNext);
        }
      };
      requestAnimationFrame(applyNext);
    };

    applyFadeIn(cardPictures, 'card-fade-in');
    applyFadeIn(featurePictures, 'fade-in');
  }

  // Optimize native lazy loading for modern browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // Use modern approach: swap data-src to src for better performance
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  } else {
    // Fallback: use intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.removeAttribute('loading');
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
