import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { AlContainer, AlHeader, AlAside, AlMain, AlFooter } from '../index'

describe('AlContainer', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlContainer, {
      slots: { default: 'content' }
    })

    expect(wrapper.find('.al-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('content')
  })

  it('adds vertical class when header/footer is present', () => {
    const wrapper = mount(AlContainer, {
      slots: {
        default: () => h(AlHeader, () => 'header')
      }
    })

    expect(wrapper.classes()).toContain('al-container--vertical')
  })

  it('renders header / aside / main / footer slots', () => {
    const wrapper = mount(AlContainer, {
      slots: {
        default: () => [
          h(AlHeader, () => 'H'),
          h(AlAside, () => 'A'),
          h(AlMain, () => 'M'),
          h(AlFooter, () => 'F')
        ]
      }
    })

    expect(wrapper.find('.al-header').text()).toContain('H')
    expect(wrapper.find('.al-aside').text()).toContain('A')
    expect(wrapper.find('.al-main').text()).toContain('M')
    expect(wrapper.find('.al-footer').text()).toContain('F')
  })
})
