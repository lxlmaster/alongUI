import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlCenter } from '../index'

describe('AlCenter', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlCenter, {
      slots: { default: 'centered' }
    })

    expect(wrapper.find('.al-center').exists()).toBe(true)
    expect(wrapper.text()).toContain('centered')
  })
})
