import { type VNode, render } from 'vue'
import { isClient } from './dom'

/**
 * Render a VNode into a container element appended to document.body.
 * Returns the container element so callers can remove it later.
 */
export function renderVNodeToBody(vnode: VNode): HTMLElement {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(vnode, container)
  return container
}

/**
 * Remove a VNode previously rendered to body.
 * Pass the container returned from renderVNodeToBody.
 */
export function removeVNodeFromBody(container: HTMLElement) {
  render(null, container)
  if (container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

/**
 * Create a teleport target element (a container appended to a mount target).
 * Returns the created container element.
 */
export function createTeleportContainer(
  mountTarget: HTMLElement = document.body,
  id?: string
): HTMLElement {
  const container = document.createElement('div')
  if (id) {
    container.id = id
  }
  mountTarget.appendChild(container)
  return container
}

/**
 * Remove a teleport container from the DOM.
 */
export function removeTeleportContainer(container: HTMLElement) {
  if (container.parentNode) {
    container.parentNode.removeChild(container)
  }
}
