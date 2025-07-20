//
// Script - Optimized for Performance
// =============================================================================

// Use dynamic imports for better code splitting
// Load critical functionality immediately
import './doc-ready'

// Lazy load non-critical features
const loadLazyFeatures = () => {
  // Load lazy images functionality
  import('./lazy-images').catch(err =>
    console.warn('Failed to load lazy images:', err)
  )

  // Load forms functionality only if forms exist
  if (document.querySelector('.needs-validation')) {
    import('./forms').catch(err =>
      console.warn('Failed to load forms:', err)
    )
  }

  // Load cookie consent only if enabled
  // import('./cookieconsent-init').catch(err =>
  //   console.warn('Failed to load cookie consent:', err)
  // );
}

// Load features after DOM is ready and page is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadLazyFeatures, { timeout: 2000 })
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(loadLazyFeatures, 100)
}
