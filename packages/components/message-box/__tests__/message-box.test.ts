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
    mount(MessageBoxVue, {
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

    // 组件用 <Teleport to="body">，内容不在 wrapper 子树里，只能从 document 查
    const el = document.querySelector('.al-message-box')
    expect(el).not.toBeNull()
    expect(el!.classList.contains('al-message-box--prompt')).toBe(true)
    expect(document.querySelector('.al-message-box__title')?.textContent).toBe('Confirm')
    expect(document.querySelector('.al-message-box__message')?.textContent).toBe('Delete this item?')
    expect(document.querySelector('.al-message-box__status--warning')).not.toBeNull()

    const input = document.querySelector('.al-message-box__input') as HTMLInputElement | null
    expect(input).not.toBeNull()
    expect(input!.value).toBe('abc')
  })

  it('emits confirm when the confirm button is clicked (interaction)', async () => {
    const wrapper = mount(MessageBoxVue, {
      props: {
        visible: true,
        confirmButtonText: 'OK'
      }
    })

    const btn = document.querySelector('.al-message-box__btn--confirm') as HTMLElement | null
    expect(btn).not.toBeNull()
    btn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()

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

    const btn = document.querySelector('.al-message-box__btn--cancel') as HTMLElement | null
    expect(btn).not.toBeNull()
    btn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()

    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
