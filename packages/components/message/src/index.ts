import { createApp, type ComponentPublicInstance } from 'vue'
import MessageVue from './message.vue'
import type { MessageOptions, MessageType, MessageHandler, MessageParams } from './message'
import { normalizeOptions } from './message'

const MAX_COUNT = 5
const MESSAGE_GAP = 8

interface MessageInstance {
  id: number
  vm: ComponentPublicInstance
  close: () => void
  container: HTMLElement
  height: number
}

let instances: MessageInstance[] = []
let seed = 0

function createMessage(options: MessageOptions): MessageHandler {
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3000;
    pointer-events: none;
  `
  document.body.appendChild(container)

  // If max count exceeded, remove oldest
  if (instances.length >= MAX_COUNT) {
    const oldest = instances.shift()
    if (oldest) {
      oldest.close()
    }
  }

  const id = ++seed

  const app = createApp(MessageVue, {
    ...options,
    onClose: () => {
      options.onClose?.()
      removeInstance(id)
      repositionMessages()
    },
    onDestroy: () => {
      app.unmount()
      container.remove()
    }
  })

  const vm = app.mount(container) as ComponentPublicInstance

  const instance: MessageInstance = {
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
    updateMessagePosition()
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

function repositionMessages() {
  requestAnimationFrame(() => {
    updateMessagePosition()
  })
}

function updateMessagePosition() {
  let topOffset = 12

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
        el.style.marginTop = `${topOffset}px`
      } else {
        topOffset += instance.height + MESSAGE_GAP
      }
    }
  })
}

function createTypedMessage(type: MessageType) {
  return (options: MessageParams): MessageHandler => {
    const normalized = normalizeOptions(options)
    return createMessage({ ...normalized, type })
  }
}

export const Message = {
  success: createTypedMessage('success'),
  warning: createTypedMessage('warning'),
  info: createTypedMessage('info'),
  error: createTypedMessage('error'),
  closeAll() {
    instances.forEach(inst => inst.close())
    instances = []
  }
}

export type { MessageOptions, MessageType, MessageHandler, MessageParams }
