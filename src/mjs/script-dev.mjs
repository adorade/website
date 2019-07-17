//
// Script
// ============================================================================

// Parallax plugin
// -----------------------------------------------------------------------------
import './parallax'

// Text Rotator
// -----------------------------------------------------------------------------
import './rotator'

// Picture observer with default `load` method
// -----------------------------------------------------------------------------
import { drawerObserver, cardsObserver } from './lazy-images'
drawerObserver.observe()
cardsObserver.observe()

// Document ready
// -----------------------------------------------------------------------------
import './doc-ready'
