import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlTree } from '../index'
import type { TreeNode } from '../index'

const data: TreeNode[] = [
  {
    label: 'Parent',
    value: 1,
    children: [{ label: 'Child', value: 2 }]
  }
]

describe('AlTree', () => {
  it('renders node labels from data', () => {
    const wrapper = mount(AlTree, {
      props: {
        data
      }
    })

    expect(wrapper.find('.al-tree').exists()).toBe(true)
    expect(wrapper.text()).toContain('Parent')
  })

  it('does not render children when defaultExpandAll is false', () => {
    const wrapper = mount(AlTree, {
      props: {
        data
      }
    })

    expect(wrapper.text()).toContain('Parent')
    expect(wrapper.text()).not.toContain('Child')
  })

  it('renders children when defaultExpandAll is true', () => {
    const wrapper = mount(AlTree, {
      props: {
        data,
        defaultExpandAll: true
      }
    })

    expect(wrapper.text()).toContain('Child')
  })

  it('renders checkbox when showCheckbox is true', () => {
    const wrapper = mount(AlTree, {
      props: {
        data,
        showCheckbox: true
      }
    })

    expect(wrapper.find('.al-tree-node__checkbox').exists()).toBe(true)
  })

  it('expands and emits node-expand when arrow is clicked', async () => {
    const wrapper = mount(AlTree, {
      props: {
        data
      }
    })

    expect(wrapper.text()).not.toContain('Child')

    await wrapper.find('.al-tree-node__arrow').trigger('click')

    expect(wrapper.text()).toContain('Child')
    expect(wrapper.emitted('node-expand')).toHaveLength(1)
  })

  it('emits check-change when checkbox is toggled', async () => {
    const wrapper = mount(AlTree, {
      props: {
        data,
        showCheckbox: true
      }
    })

    await wrapper.find('.al-tree-node__checkbox').trigger('click')

    expect(wrapper.emitted('check-change')).toHaveLength(1)
    const payload = wrapper.emitted('check-change')![0]
    expect((payload[0] as TreeNode).value).toBe(1)
    expect(payload[1]).toBe(true)
  })
})
