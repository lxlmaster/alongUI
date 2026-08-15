import { describe, expect, it, afterEach } from 'vitest'
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

  it('reflects type / showClose props (component form)', () => {
    const wrapper = mount(MessageVue, {
      props: {
        message: 'Warn content',
        type: 'warning',
        showClose: true,
        duration: 0
      }
    })

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
    await flushPromises()

    expect(document.querySelector('.al-message')).toBeNull()
  })
})
