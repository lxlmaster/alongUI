import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlGrid } from '../index'

describe('AlGrid', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlGrid, {
      slots: { default: 'cell' }
    })

    expect(wrapper.find('.al-grid').exists()).toBe(true)
    expect(wrapper.text()).toContain('cell')
  })

  it('renders multiple children', () => {
    const wrapper = mount(AlGrid, {
      slots: {
        default: ['<div>a</div>', '<div>b</div>']
      }
    })

    expect(wrapper.findAll('div')).toHaveLength(2)
  })
})
