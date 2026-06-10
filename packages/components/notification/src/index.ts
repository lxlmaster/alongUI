import { createApp, type ComponentPublicInstance } from 'vue'
import NotificationVue from './notification.vue'
import type { NotificationOptions, NotificationType, NotificationHandler, NotificationParams } from './notification'
import { normalizeOptions } from './notification'

const NOTIFICATION_GAP = 12

interface NotificationInstance {
  id: number
  vm: ComponentPublicInstance
  close: () => void
  container: HTMLElement
  height: number
}

let instances: NotificationInstance[] = []
let seed = 0

function createNotification(options: NotificationOptions): NotificationHandler {
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3100;
    pointer-events: none;
    padding: 16px;
  `
  document.body.appendChild(container)

  const id = ++seed

  const app = createApp(NotificationVue, {
    ...options,
    onClose: () => {
      options.onClose?.()
      removeInstance(id)
      repositionNotifications()
    },
    onDestroy: () => {
      app.unmount()
      container.remove()
    }
  })

  const vm = app.mount(container) as ComponentPublicInstance

  const instance: NotificationInstance = {
    id,
    vm,
    close: () => {
      (vm as any).close?.()
    },
    container,
    height: 0
  }

  instances.push(instance)

  requestAnimationFrame(() => {
    updateNotificationPosition()
  })

  return {
    close: () => {
      instance.close()
    }
  }
}

function removeInstance(id: number) {
  const index = instances.findIndex(inst => inst.id === id)
  if (index > -1) {
    instances.splice(index, 1)
  }
}

function repositionNotifications() {
  requestAnimationFrame(() => {
    updateNotificationPosition()
  })
}

function updateNotificationPosition() {
  let topOffset = 0

  instances.forEach((instance) => {
    const el = instance.container.firstElementChild as HTMLElement | null
    if (el) {
      instance.height = el.offsetHeight
      el.style.marginTop = '0'
      el.style.position = 'relative'
      el.style.pointerEvents = 'auto'
    }
  })

  instances.forEach((instance, index) => {
    const el = instance.container.firstElementChild as HTMLElement | null
    if (el) {
      if (index === 0) {
        el.style.marginTop = '0'
      } else {
        topOffset += instances[index - 1].height + NOTIFICATION_GAP
        el.style.marginTop = `${topOffset}px`
      }
    }
  })
}

function createTypedNotification(type: NotificationType) {
  return (options: NotificationParams): NotificationHandler => {
    const normalized = normalizeOptions(options)
    return createNotification({ ...normalized, type })
  }
}

export const Notification = {
  success: createTypedNotification('success'),
  warning: createTypedNotification('warning'),
  info: createTypedNotification('info'),
  error: createTypedNotification('error'),
  closeAll() {
    instances.forEach(inst => inst.close())
    instances = []
  }
}

export type { NotificationOptions, NotificationType, NotificationHandler, NotificationParams }
