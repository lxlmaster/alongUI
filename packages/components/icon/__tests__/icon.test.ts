import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlIcon } from '../index'

describe('AlIcon', () => {
  it('renders slot content', () => {
    const wrapper = mount(AlIcon, {
      slots: {
        default: '<svg class="custom-icon" />'
      }
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('applies size and color styles', () => {
    const wrapper = mount(AlIcon, {
      props: {
        size: 20,
        color: '#0071e3'
      }
    })

    expect(wrapper.attributes('style')).toContain('font-size: 20px')
    expect(wrapper.attributes('style')).toContain('color: rgb(0, 113, 227)')
  })
})

