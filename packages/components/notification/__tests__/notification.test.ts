import { describe, expect, it, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { Notification } from '../index'
import NotificationVue from '../src/notification.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('AlNotification', () => {
  it('renders via the function API (success)', async () => {
    Notification.success({ title: 'Done', message: 'Operation succeeded', duration: 0 })
    await flushPromises()

    const el = document.querySelector('.al-notification')
    expect(el).not.toBeNull()
    expect(el!.textContent).toContain('Operation succeeded')
    expect(el!.classList.contains('al-notification--success')).toBe(true)
  })

  it('reflects title / type / showClose props (component form)', async () => {
    mount(NotificationVue, {
      props: {
        title: 'Title here',
        message: 'Msg here',
        type: 'error',
        showClose: true,
        duration: 0
      }
    })
    // 组件用 <Teleport to="body">，且 visible 在 onMounted 才置 true
    await nextTick()

    const el = document.querySelector('.al-notification')
    expect(el).not.toBeNull()
    expect(el!.classList.contains('al-notification--error')).toBe(true)
    expect(document.querySelector('.al-notification__title')?.textContent).toBe('Title here')
    expect(document.querySelector('.al-notification__close')).not.toBeNull()
  })

  it('removes the DOM after the close button is clicked (interaction)', async () => {
    mount(NotificationVue, {
      props: {
        message: 'Closable notification',
        showClose: true,
        duration: 0
      }
    })
    await nextTick()

    const closeBtn = document.querySelector('.al-notification__close') as HTMLElement | null
    expect(closeBtn).not.toBeNull()
    closeBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    // DOM 在 transition 的 after-leave 之后才移除
    await vi.waitFor(() => {
      expect(document.querySelector('.al-notification')).toBeNull()
    })
  })
})
