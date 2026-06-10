import { isClient } from './dom'

/**
 * Set CSS custom property on a target element.
 */
export function setCSSVar(
  el: HTMLElement,
  name: string,
  value: string
) {
  el.style.setProperty(name, value)
}

/**
 * Get CSS custom property value from a target element.
 */
export function getCSSVar(
  el: HTMLElement,
  name: string
): string {
  return getComputedStyle(el).getPropertyValue(name).trim()
}

/**
 * Set multiple CSS custom properties on a target element.
 */
export function setCSSVars(
  el: HTMLElement,
  vars: Record<string, string>
) {
  Object.entries(vars).forEach(([name, value]) => {
    el.style.setProperty(name, value)
  })
}

/**
 * Get the scrollbar width of the current browser.
 * Returns 0 on server or if no scrollbar is present.
 */
export function getScrollbarWidth(): number {
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
