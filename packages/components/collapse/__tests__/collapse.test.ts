import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { AlCollapse, AlCollapseItem } from '../index'

describe('AlCollapse', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlCollapse, {
      slots: {
        default: () => h(AlCollapseItem, { name: 'a', title: 'A' }, () => 'content')
      }
    })

    expect(wrapper.find('.al-collapse').exists()).toBe(true)
    expect(wrapper.text()).toContain('A')
  })

  it('toggles item and emits change on header click', async () => {
    const wrapper = mount(AlCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () => h(AlCollapseItem, { name: 'a', title: 'A' }, () => 'content')
      }
    })

    await wrapper.find('.al-collapse-item__header').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']])
    expect(wrapper.emitted('change')?.[0]).toEqual([['a']])
  })

  it('does not toggle when item is disabled', async () => {
    const wrapper = mount(AlCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () =>
          h(AlCollapseItem, { name: 'a', title: 'A', disabled: true }, () => 'content')
      }
    })

    await wrapper.find('.al-collapse-item__header').trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
