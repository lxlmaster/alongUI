import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlRate } from '../index'

describe('AlRate', () => {
  it('renders with default count', () => {
    const wrapper = mount(AlRate)
    const items = wrapper.findAll('.al-rate__item')
    expect(items.length).toBe(5)
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(AlRate)
    const items = wrapper.findAll('.al-rate__item')

    await items[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled prop', () => {
    const wrapper = mount(AlRate, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })
})
