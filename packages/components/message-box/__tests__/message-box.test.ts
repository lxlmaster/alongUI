import { describe, expect, it, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { AlMessageBox } from '../index'
import MessageBoxVue from '../src/message-box.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('AlMessageBox', () => {
  it('renders via the function API (alert)', async () => {
    const p = AlMessageBox.alert('Save changes?')
    p.catch(() => {})
    await flushPromises()

    const el = document.querySelector('.al-message-box')
    expect(el).not.toBeNull()
    expect(el!.textContent).toContain('Save changes?')
    // default title for alert is '提示'
    expect(el!.textContent).toContain('提示')
  })

  it('reflects title / content / type / showInput props (component form)', () => {
    const wrapper = mount(MessageBoxVue, {
      props: {
        visible: true,
        title: 'Confirm',
        content: 'Delete this item?',
        type: 'warning',
        showInput: true,
        inputPlaceholder: 'Please type',
        inputValue: 'abc'
      }
    })

    const el = wrapper.find('.al-message-box')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('al-message-box--prompt')
    expect(wrapper.find('.al-message-box__title').text()).toBe('Confirm')
    expect(wrapper.find('.al-message-box__message').text()).toBe('Delete this item?')
    expect(wrapper.find('.al-message-box__status--warning').exists()).toBe(true)
    expect(wrapper.find('.al-message-box__input').exists()).toBe(true)
    expect((wrapper.find('.al-message-box__input').element as HTMLInputElement).value).toBe('abc')
  })

  it('emits confirm when the confirm button is clicked (interaction)', async () => {
    const wrapper = mount(MessageBoxVue, {
      props: {
        visible: true,
        confirmButtonText: 'OK'
      }
    })

    await wrapper.find('.al-message-box__btn--confirm').trigger('click')

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('emits cancel when the cancel button is clicked (interaction)', async () => {
    const wrapper = mount(MessageBoxVue, {
      props: {
        visible: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }
    })

    await wrapper.find('.al-message-box__btn--cancel').trigger('click')

    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
