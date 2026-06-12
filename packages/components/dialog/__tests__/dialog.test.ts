import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { AlDialog } from '../index'

describe('AlDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not render overlay before first open', () => {
    mount(AlDialog, {
      props: {
        modelValue: false
      },
      slots: {
        default: 'Dialog body'
      }
    })

    expect(document.body.querySelector('.al-dialog-overlay')).toBeNull()
  })

  it('opens and emits update when close button is clicked', async () => {
    const wrapper = mount(AlDialog, {
      props: {
        modelValue: true,
        title: '提示'
      },
      slots: {
        default: 'Dialog body'
      }
    })

    await nextTick()
    await nextTick()

    const overlay = document.body.querySelector<HTMLElement>('.al-dialog-overlay')
    expect(overlay).not.toBeNull()
    expect(overlay?.style.display).not.toBe('none')

    document.body.querySelector<HTMLButtonElement>('.al-dialog__close')?.click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('closes when clicking modal overlay by default', async () => {
    const wrapper = mount(AlDialog, {
      props: {
        modelValue: true
      }
    })

    await nextTick()
    await nextTick()
    document.body
      .querySelector<HTMLElement>('.al-dialog-overlay')
      ?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})
