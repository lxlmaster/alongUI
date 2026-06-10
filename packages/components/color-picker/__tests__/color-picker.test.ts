import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlColorPicker } from '../index'

describe('AlColorPicker', () => {
  it('renders with default color', () => {
    const wrapper = mount(AlColorPicker)
    expect(wrapper.find('.al-color-picker').exists()).toBe(true)
  })

  it('renders with custom color', () => {
    const wrapper = mount(AlColorPicker, {
      props: {
        modelValue: '#FF0000'
      }
    })

    expect(wrapper.text()).toContain('#FF0000')
  })

  it('toggles dropdown on trigger click', async () => {
    const wrapper = mount(AlColorPicker)

    await wrapper.find('.al-color-picker__trigger').trigger('click')

    expect(wrapper.find('.al-color-picker__dropdown').exists()).toBe(true)
  })
})
