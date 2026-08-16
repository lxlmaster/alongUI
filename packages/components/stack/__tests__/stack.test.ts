import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlStack } from '../index'

describe('AlStack', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlStack, {
      slots: { default: 'item' }
    })

    expect(wrapper.find('.al-stack').exists()).toBe(true)
    expect(wrapper.text()).toContain('item')
  })

  it('renders multiple children', () => {
    const wrapper = mount(AlStack, {
      slots: {
        default: ['<span>a</span>', '<span>b</span>']
      }
    })

    expect(wrapper.findAll('span')).toHaveLength(2)
  })
})
