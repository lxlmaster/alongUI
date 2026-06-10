import { type Ref, shallowRef, watch, onBeforeUnmount } from 'vue'
import { isClient } from '@along-ui/utils'

export interface UsePortalOptions {
  /** Whether the portal is active (rendered) */
  active?: boolean | Ref<boolean>
  /** CSS selector or element to mount into (default: document.body) */
  to?: string | HTMLElement
  /** Portal id attribute for the container element */
  id?: string
}

export function usePortal(options: UsePortalOptions = {}) {
  if (!isClient()) return { containerRef: shallowRef(null), open: () => {}, close: () => {} }

  const {
    active = true,
    to,
    id,
  } = options

  const containerRef: Ref<HTMLElement | null> = shallowRef(null)

  function getMountTarget(): HTMLElement {
    if (typeof to === 'string') {
      const el = document.querySelector<HTMLElement>(to)
      if (el) return el
    }
    if (to instanceof HTMLElement) return to
    return document.body
  }

  function open() {
    if (containerRef.value) return

    const mountTarget = getMountTarget()
    const container = document.createElement('div')
    if (id) {
      container.id = id
    }
    mountTarget.appendChild(container)
    containerRef.value = container
  }

  function close() {
    const container = containerRef.value
    if (!container) return

    container.parentNode?.removeChild(container)
    containerRef.value = null
  }

  watch(
    () => (typeof active === 'boolean' ? active : active.value),
    (val) => {
      if (val) {
        open()
      } else {
        close()
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    close()
  })

  return {
    containerRef,
    open,
    close,
  }
}
