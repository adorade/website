//
// Script
// ============================================================================

// Parallax plugin
// -----------------------------------------------------------------------------
import './parallax.es6'

// Text Rotator
// -----------------------------------------------------------------------------
import './rotator.es6'

// Picture observer with default `load` method
// -----------------------------------------------------------------------------
import { drawerObserver, pictureObserver } from './lazy-images.es6'
drawerObserver.observe()
pictureObserver.observe()

// Document ready
// -----------------------------------------------------------------------------
import './doc-ready.es6'

// Register Service Worker
// -----------------------------------------------------------------------------
import './service-worker.es6'
