import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { AlDrawer } from '../index'

describe('AlDrawer', () => {
  it('does not render overlay when closed', () => {
    mount(AlDrawer, { props: { modelValue: false } })

    expect(document.querySelector('.al-drawer-overlay')).toBeNull()
  })

  it('renders overlay when opened', async () => {
    mount(AlDrawer, {
      props: { modelValue: true, title: 'Title' },
      attachTo: document.body
    })
    await flushPromises()
    await nextTick()

    const overlay = document.querySelector('.al-drawer-overlay')
    expect(overlay).not.toBeNull()
    expect(document.querySelector('.al-drawer__title')?.textContent).toContain('Title')
  })

  it('reflects direction class', async () => {
    mount(AlDrawer, {
      props: { modelValue: true, direction: 'ltr' },
      attachTo: document.body
    })
    await flushPromises()
    await nextTick()

    expect(document.querySelector('.al-drawer')?.classList).toContain('al-drawer--ltr')
  })

  it('emits update:modelValue and close on close button click', async () => {
    const wrapper = mount(AlDrawer, {
      props: { modelValue: true },
      attachTo: document.body
    })
    await flushPromises()
    await nextTick()

    const closeBtn = document.querySelector('.al-drawer__close') as HTMLElement
    expect(closeBtn).not.toBeNull()

    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
