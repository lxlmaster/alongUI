import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlSelect } from '../index'

const options = [
  { label: '进行中', value: 'progress' },
  { label: '已完成', value: 'done' },
  { label: '已归档', value: 'archived', disabled: true }
]

describe('AlSelect', () => {
  it('renders placeholder', () => {
    const wrapper = mount(AlSelect, {
      props: { options, placeholder: '请选择状态' }
    })

    expect(wrapper.text()).toContain('请选择状态')
  })

  it('updates single value when selecting option', async () => {
    const wrapper = mount(AlSelect, {
      props: { options }
    })

    await wrapper.find('.al-select__trigger').trigger('click')
    await wrapper.findAll('.al-select__option')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['done'])
  })

  it('supports multiple selection and collapse tags', async () => {
    const wrapper = mount(AlSelect, {
      props: {
        options,
        modelValue: [],
        multiple: true,
        collapseTags: true
      }
    })

    await wrapper.find('.al-select__trigger').trigger('click')
    await wrapper.findAll('.al-select__option')[0].trigger('click')
    await wrapper.setProps({ modelValue: ['progress'] })
    await wrapper.findAll('.al-select__option')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['progress', 'done']])
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(AlSelect, {
      props: { options, disabled: true }
    })

    await wrapper.find('.al-select__trigger').trigger('click')

    expect(wrapper.find('.al-select__dropdown').exists()).toBe(false)
  })
})
