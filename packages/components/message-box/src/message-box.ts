import { createApp } from 'vue'
import MessageBoxVue from './message-box.vue'

export type MessageBoxType = '' | 'success' | 'warning' | 'info' | 'error'

export interface MessageBoxOptions {
  title?: string
  content?: string
  type?: MessageBoxType
  showInput?: boolean
  inputPlaceholder?: string
  inputValue?: string
  confirmButtonText?: string
  cancelButtonText?: string
  closeOnClickModal?: boolean
}

function createMessageBox(options: MessageBoxOptions): Promise<boolean | string> {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    let isResolved = false

    function cleanup() {
      app.unmount()
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }

    function handleConfirm(value?: string) {
      if (isResolved) return
      isResolved = true
      if (options.showInput) {
        resolve(value ?? '')
      } else {
        resolve(true)
      }
      cleanup()
    }

    function handleCancel() {
      if (isResolved) return
      isResolved = true
      reject('cancel')
      cleanup()
    }

    const app = createApp(MessageBoxVue, {
      ...options,
      visible: true,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      'onUpdate:visible': (val: boolean) => {
        if (!val && !isResolved) {
          handleCancel()
        }
      }
    })

    app.mount(container)
  })
}

export const ElMessageBox = {
  alert(content: string, title?: string, options?: MessageBoxOptions): Promise<boolean> {
    return createMessageBox({
      content,
      title: title || '提示',
      confirmButtonText: 'OK',
      cancelButtonText: '',
      closeOnClickModal: false,
      ...options
    }) as Promise<boolean>
  },

  confirm(content: string, title?: string, options?: MessageBoxOptions): Promise<boolean> {
    return createMessageBox({
      content,
      title: title || '确认',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      closeOnClickModal: false,
      ...options
    }) as Promise<boolean>
  },

  prompt(content: string, title?: string, options?: MessageBoxOptions): Promise<string> {
    return createMessageBox({
      content,
      title: title || '输入',
      showInput: true,
      inputPlaceholder: 'Please input',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      closeOnClickModal: false,
      ...options
    }) as Promise<string>
  }
}
