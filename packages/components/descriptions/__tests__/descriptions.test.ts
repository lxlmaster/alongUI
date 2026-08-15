import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { AlDescriptions, AlDescriptionsItem } from '../index'

describe('AlDescriptions', () => {
  it('renders title prop', () => {
    const wrapper = mount(AlDescriptions, {
      props: { title: 'Info' }
    })

    expect(wrapper.find('.al-descriptions__title').text()).toContain('Info')
  })

  it('renders items with label and content', () => {
    const wrapper = mount(AlDescriptions, {
      slots: {
        default: () =>
          h(AlDescriptionsItem, { label: 'Name' }, () => 'Alice')
      }
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Alice')
  })

  it('reflects border prop as class', () => {
    const wrapper = mount(AlDescriptions, {
      props: { border: true },
      slots: {
        default: () => h(AlDescriptionsItem, { label: 'Name' }, () => 'Alice')
      }
    })

    expect(wrapper.find('.al-descriptions__body').classes()).toContain(
      'al-descriptions--border'
    )
  })
})
