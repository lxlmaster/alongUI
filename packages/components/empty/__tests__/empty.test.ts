import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlEmpty } from '../index'

describe('AlEmpty', () => {
  it('renders the default description', () => {
    const wrapper = mount(AlEmpty)

    expect(wrapper.find('.al-empty__description').text()).toBe('暂无数据')
  })

  it('reflects a custom description prop', () => {
    const wrapper = mount(AlEmpty, {
      props: { description: 'No result' }
    })

    expect(wrapper.find('.al-empty__description').text()).toBe('No result')
  })

  it('renders the default image svg', () => {
    const wrapper = mount(AlEmpty)

    expect(wrapper.find('.al-empty__image svg').exists()).toBe(true)
  })

  it('renders an action slot when provided', () => {
    const wrapper = mount(AlEmpty, {
      slots: {
        action: '<button>Retry</button>'
      }
    })

    expect(wrapper.find('.al-empty__action').exists()).toBe(true)
    expect(wrapper.find('.al-empty__action').text()).toContain('Retry')
  })
})
