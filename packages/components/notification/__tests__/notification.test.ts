import { describe, expect, it, afterEach } from 'vitest'
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

  it('reflects title / type / showClose props (component form)', () => {
    const wrapper = mount(NotificationVue, {
      props: {
        title: 'Title here',
        message: 'Msg here',
        type: 'error',
        showClose: true,
        duration: 0
      }
    })

    const el = wrapper.find('.al-notification')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('al-notification--error')
    expect(wrapper.find('.al-notification__title').text()).toBe('Title here')
    expect(wrapper.find('.al-notification__close').exists()).toBe(true)
  })

  it('removes the DOM after the close button is clicked (interaction)', async () => {
    const wrapper = mount(NotificationVue, {
      props: {
        message: 'Closable notification',
        showClose: true,
        duration: 0
      }
    })

    await wrapper.find('.al-notification__close').trigger('click')
    await flushPromises()

    expect(document.querySelector('.al-notification')).toBeNull()
  })
})
