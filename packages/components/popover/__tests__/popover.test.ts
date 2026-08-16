import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlPopover } from '../index'

describe('AlPopover', () => {
  it('renders reference slot', () => {
    const wrapper = mount(AlPopover, {
      slots: {
        reference: 'Trigger'
      }
    })

    expect(wrapper.find('.al-popover__trigger').text()).toContain('Trigger')
  })

  it('reflects placement class', () => {
    const wrapper = mount(AlPopover, {
      props: { placement: 'bottom' }
    })

    expect(wrapper.classes()).toContain('al-popover--bottom')
  })

  it('renders content from prop', async () => {
    const wrapper = mount(AlPopover, {
      props: { content: 'Hello' },
      slots: { reference: 'Trigger' }
    })

    // 面板只在展开后渲染，先点开触发器再断言 content
    await wrapper.find('.al-popover__trigger').trigger('click')

    expect(wrapper.text()).toContain('Hello')
  })

  it('toggles the panel on click', async () => {
    const wrapper = mount(AlPopover, {
      props: { content: 'Hello' },
      slots: { reference: 'Trigger' }
    })

    expect(wrapper.find('.al-popover__panel').exists()).toBe(false)

    await wrapper.find('.al-popover__trigger').trigger('click')

    expect(wrapper.find('.al-popover__panel').exists()).toBe(true)
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(AlPopover, {
      props: { disabled: true, content: 'Hello' },
      slots: { reference: 'Trigger' }
    })

    await wrapper.find('.al-popover__trigger').trigger('click')

    expect(wrapper.find('.al-popover__panel').exists()).toBe(false)
  })
})
