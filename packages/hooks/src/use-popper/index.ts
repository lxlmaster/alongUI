import { type Ref, watch, onBeforeUnmount } from 'vue'
import { isClient } from '@along-ui/utils'

export type PopperPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export interface UsePopperOptions {
  /** Placement of the popper relative to the trigger */
  placement?: PopperPlacement | Ref<PopperPlacement>
  /** Whether the popper is visible */
  visible?: boolean | Ref<boolean>
  /** Gap (px) between trigger and popper */
  offset?: number
  /** Whether to auto-flip when out of viewport */
  autoFlip?: boolean
}

export interface PopperStyles {
  position: string
  top: string
  left: string
  zIndex: string
}

function computePosition(
  triggerRect: DOMRect,
  popperRect: DOMRect,
  placement: PopperPlacement,
  offset: number
): { top: number; left: number } {
  const { innerWidth, innerHeight } = window

  let top = 0
  let left = 0

  // Calculate anchor point on trigger
  switch (placement) {
    case 'top':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'top-start':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.right - popperRect.width
      break
    case 'bottom':
      top = triggerRect.bottom + offset
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'bottom-start':
      top = triggerRect.bottom + offset
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.bottom + offset
      left = triggerRect.right - popperRect.width
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.left - popperRect.width - offset
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - popperRect.width - offset
      break
    case 'left-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.left - popperRect.width - offset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.right + offset
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + offset
      break
    case 'right-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.right + offset
      break
  }

  return { top, left }
}

function autoFlipPlacement(
  triggerRect: DOMRect,
  popperRect: DOMRect,
  placement: PopperPlacement,
  offset: number
): PopperPlacement {
  const { innerWidth, innerHeight } = window
  const { top, left } = computePosition(triggerRect, popperRect, placement, offset)

  const margin = 8

  // Check if the popper would overflow
  const overflowsTop = top < margin
  const overflowsBottom = top + popperRect.height > innerHeight - margin
  const overflowsLeft = left < margin
  const overflowsRight = left + popperRect.width > innerWidth - margin

  if (overflowsTop || overflowsBottom || overflowsLeft || overflowsRight) {
    // Flip to opposite side
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return placement.replace('top', 'bottom') as PopperPlacement
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return placement.replace('bottom', 'top') as PopperPlacement
      case 'left':
      case 'left-start':
      case 'left-end':
        return placement.replace('left', 'right') as PopperPlacement
      case 'right':
      case 'right-start':
      case 'right-end':
        return placement.replace('right', 'left') as PopperPlacement
    }
  }

  return placement
}

/**
 * CSS-based popper positioning hook.
 * No external dependencies — uses getBoundingClientRect + fixed positioning.
 */
export function usePopper(
  triggerRef: Ref<HTMLElement | null>,
  popperRef: Ref<HTMLElement | null>,
  options: UsePopperOptions = {}
) {
  if (!isClient()) return { popperStyle: { position: 'fixed', top: '0', left: '0', zIndex: '9999' }, update: () => {} }

  const {
    placement = 'bottom',
    visible = true,
    offset = 8,
    autoFlip = true,
  } = options

  let animationFrameId: number | null = null

  function getPlacement(): PopperPlacement {
    if (typeof placement === 'string') return placement
    return placement.value
  }

  function isVisible(): boolean {
    if (typeof visible === 'boolean') return visible
    return visible.value
  }

  function update() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    animationFrameId = requestAnimationFrame(() => {
      animationFrameId = null

      const trigger = triggerRef.value
      const popper = popperRef.value

      if (!trigger || !popper || !isVisible()) return

      const triggerRect = trigger.getBoundingClientRect()
      const popperRect = popper.getBoundingClientRect()

      let currentPlacement = getPlacement()

      if (autoFlip) {
        currentPlacement = autoFlipPlacement(triggerRect, popperRect, currentPlacement, offset)
      }

      const { top, left } = computePosition(triggerRect, popperRect, currentPlacement, offset)

      popper.style.position = 'fixed'
      popper.style.top = `${top}px`
      popper.style.left = `${left}px`
      popper.style.zIndex = '9999'
    })
  }

  function handleScrollOrResize() {
    update()
  }

  watch(
    () => isVisible(),
    (val) => {
      if (val) {
        // Wait for DOM to render popper before measuring
        requestAnimationFrame(() => {
          update()
        })
      }
    },
    { immediate: false }
  )

  watch(
    () => getPlacement(),
    () => {
      update()
    }
  )

  // Set up scroll/resize observers when visible
  watch(
    () => isVisible(),
    (val) => {
      if (val) {
        window.addEventListener('scroll', handleScrollOrResize, true)
        window.addEventListener('resize', handleScrollOrResize)
      } else {
        window.removeEventListener('scroll', handleScrollOrResize, true)
        window.removeEventListener('resize', handleScrollOrResize)
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener('scroll', handleScrollOrResize, true)
    window.removeEventListener('resize', handleScrollOrResize)
  })

  return {
    popperStyle: { position: 'fixed', top: '0', left: '0', zIndex: '9999' } as PopperStyles,
    update,
  }
}
