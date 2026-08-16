import { describe, expect, it, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { Message } from '../index'
import MessageVue from '../src/message.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('AlMessage', () => {
  it('renders via the function API (success)', async () => {
    Message.success({ message: 'Hello Message', duration: 0 })
    await flushPromises()

    const el = document.querySelector('.al-message')
    expect(el).not.toBeNull()
    expect(el!.textContent).toContain('Hello Message')
    expect(el!.classList.contains('al-message--success')).toBe(true)
  })

  it('reflects type / showClose props (component form)', async () => {
    const wrapper = mount(MessageVue, {
      props: {
        message: 'Warn content',
        type: 'warning',
        showClose: true,
        duration: 0
      }
    })
    // visible 在 onMounted 里才置 true，需等一次渲染
    await nextTick()

    const el = wrapper.find('.al-message')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('al-message--warning')
    expect(el.classes()).toContain('is-closable')
    expect(wrapper.find('.al-message__close').exists()).toBe(true)
    expect(el.text()).toContain('Warn content')
  })

  it('removes the DOM after close() is called (interaction)', async () => {
    const handler = Message.info({ message: 'Closing', duration: 0 })
    await flushPromises()
    expect(document.querySelector('.al-message')).not.toBeNull()

    handler.close()

    // DOM 在 transition 的 after-leave 之后才移除，用轮询等待而不是固定 sleep
    await vi.waitFor(() => {
      expect(document.querySelector('.al-message')).toBeNull()
    })
  })
})
