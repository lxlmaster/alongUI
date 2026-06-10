import { type Ref, watch, onBeforeUnmount } from 'vue'
import { isClient } from '@along-ui/utils'

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  active?: boolean | Ref<boolean>
  /** Element to focus first when trap activates (default: first focusable) */
  initialFocus?: 'auto' | 'first' | HTMLElement | (() => HTMLElement | null)
  /** Whether to return focus to the previously focused element on deactivation */
  restoreFocus?: boolean
  /** Called when the focus trap is activated */
  onActivate?: () => void
  /** Called when the focus trap is deactivated */
  onDeactivate?: () => void
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'details',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

function getActiveElement(): HTMLElement | null {
  if (!isClient()) return null
  return document.activeElement as HTMLElement | null
}

export function useFocusTrap(
  containerRef: Ref<HTMLElement | null>,
  options: UseFocusTrapOptions = {}
) {
  if (!isClient()) return

  const {
    active = true,
    initialFocus = 'auto',
    restoreFocus = true,
    onActivate,
    onDeactivate,
  } = options

  let previousActiveElement: HTMLElement | null = null

  function isActive(): boolean {
    if (typeof active === 'boolean') return active
    return active.value
  }

  function activate() {
    previousActiveElement = getActiveElement()
    const container = containerRef.value
    if (!container) return

    container.addEventListener('keydown', handleKeydown)

    // Focus the initial element
    if (initialFocus === 'first' || initialFocus === 'auto') {
      const focusable = getFocusableElements(container)
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    } else if (typeof initialFocus === 'function') {
      initialFocus()?.focus()
    } else if (initialFocus instanceof HTMLElement) {
      initialFocus.focus()
    }

    onActivate?.()
  }

  function deactivate() {
    const container = containerRef.value
    if (container) {
      container.removeEventListener('keydown', handleKeydown)
    }

    if (restoreFocus && previousActiveElement) {
      previousActiveElement.focus()
      previousActiveElement = null
    }

    onDeactivate?.()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    const container = containerRef.value
    if (!container) return

    const focusable = getFocusableElements(container)
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  function handleFocusIn(event: FocusEvent) {
    const container = containerRef.value
    if (!container || !isActive()) return

    const target = event.target as Node | null
    if (!target) return

    if (!container.contains(target)) {
      const focusable = getFocusableElements(container)
      if (focusable.length > 0) {
        focusable[0].focus()
      } else {
        container.focus()
      }
    }
  }

  watch(
    () => (typeof active === 'boolean' ? active : active.value),
    (val) => {
      if (val) {
        activate()
        document.addEventListener('focusin', handleFocusIn)
      } else {
        deactivate()
        document.removeEventListener('focusin', handleFocusIn)
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    deactivate()
    document.removeEventListener('focusin', handleFocusIn)
  })

  return {
    activate,
    deactivate,
  }
}
