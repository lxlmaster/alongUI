import { type Ref, watch, onBeforeUnmount } from 'vue'
import { isClient } from '@along-ui/utils'

export interface UseScrollLockOptions {
  /** Whether the scroll lock is active */
  active?: boolean | Ref<boolean>
  /** Target element to lock scrolling on (default: document.body) */
  target?: HTMLElement | (() => HTMLElement | null)
}

let lockCount = 0
const originalOverflow = new Map<HTMLElement, string>()
const originalPaddingRight = new Map<HTMLElement, string>()

function getScrollbarWidth(): number {
  if (!isClient()) return 0

  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.parentNode?.removeChild(outer)
  return scrollbarWidth
}

export function useScrollLock(options: UseScrollLockOptions = {}) {
  if (!isClient()) return

  const {
    active = true,
    target,
  } = options

  function getTargetElement(): HTMLElement | null {
    if (typeof target === 'function') return target()
    if (target instanceof HTMLElement) return target
    return document.body
  }

  function lock() {
    const el = getTargetElement()
    if (!el) return

    if (lockCount === 0) {
      // Save original styles
      originalOverflow.set(el, el.style.overflow)
      originalPaddingRight.set(el, el.style.paddingRight || '')

      const scrollbarWidth = getScrollbarWidth()

      // Apply scroll lock with padding compensation
      el.style.overflow = 'hidden'

      if (scrollbarWidth > 0) {
        const currentPadding = parseFloat(getComputedStyle(el).paddingRight) || 0
        el.style.paddingRight = `${currentPadding + scrollbarWidth}px`
      }
    }

    lockCount++
  }

  function unlock() {
    const el = getTargetElement()
    if (!el) return

    lockCount--

    if (lockCount <= 0) {
      lockCount = 0

      // Restore original styles
      const overflow = originalOverflow.get(el)
      const paddingRight = originalPaddingRight.get(el)

      if (overflow !== undefined) {
        el.style.overflow = overflow
      }
      if (paddingRight !== undefined) {
        el.style.paddingRight = paddingRight
      }

      originalOverflow.delete(el)
      originalPaddingRight.delete(el)
    }
  }

  watch(
    () => (typeof active === 'boolean' ? active : active.value),
    (val) => {
      if (val) {
        lock()
      } else {
        unlock()
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (isActive()) {
      unlock()
    }
  })

  function isActive(): boolean {
    if (typeof active === 'boolean') return active
    return active.value
  }

  return {
    lock,
    unlock,
  }
}
