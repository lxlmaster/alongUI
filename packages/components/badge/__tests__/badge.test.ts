import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlBadge } from '../index'

describe('AlBadge', () => {
  it('renders the default slot as the target element', () => {
    const wrapper = mount(AlBadge, {
      slots: {
        default: 'Target'
      }
    })

    expect(wrapper.text()).toContain('Target')
  })

  it('reflects the value prop as content', () => {
    const wrapper = mount(AlBadge, {
      props: { value: 8 }
    })

    expect(wrapper.find('.al-badge__content').text()).toBe('8')
  })

  it('caps value above max with a "+" suffix', () => {
    const wrapper = mount(AlBadge, {
      props: { value: 120, max: 99 }
    })

    expect(wrapper.find('.al-badge__content').text()).toBe('99+')
  })

  it('renders a dot and empty content when isDot is set', () => {
    const wrapper = mount(AlBadge, {
      props: { isDot: true, value: 5 }
    })

    const content = wrapper.find('.al-badge__content')
    expect(content.classes()).toContain('is-dot')
    expect(content.text()).toBe('')
  })

  it('hides the content when hidden is set', () => {
    const wrapper = mount(AlBadge, {
      props: { value: 5, hidden: true }
    })

    expect(wrapper.find('.al-badge__content').exists()).toBe(false)
  })
})
