import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlSlider } from '../index'

describe('AlSlider', () => {
  it('renders with default value', () => {
    const wrapper = mount(AlSlider)
    expect(wrapper.find('.al-slider').exists()).toBe(true)
  })

  it('renders with custom value', () => {
    const wrapper = mount(AlSlider, {
      props: {
        modelValue: 50
      }
    })

    expect(wrapper.find('.al-slider__bar').exists()).toBe(true)
  })

  it('respects disabled prop', () => {
    const wrapper = mount(AlSlider, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })
})
