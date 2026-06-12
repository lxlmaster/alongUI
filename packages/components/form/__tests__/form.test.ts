import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlForm, AlFormItem } from '../index'
import { defineComponent, h, ref } from 'vue'

describe('AlForm', () => {
  it('renders slots', () => {
    const wrapper = mount(AlForm, {
      slots: {
        default: '<div class="custom-slot">Content</div>'
      }
    })

    expect(wrapper.find('.custom-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('Content')
  })

  it('passes label position class', () => {
    const wrapper = mount(AlForm, {
      props: {
        labelPosition: 'left'
      }
    })

    expect(wrapper.classes()).toContain('al-form--label-left')
  })

  it('passes size class', () => {
    const wrapper = mount(AlForm, {
      props: {
        size: 'large'
      }
    })

    expect(wrapper.classes()).toContain('al-form--large')
  })

  it('renders form items', () => {
    const wrapper = mount(AlForm, {
      slots: {
        default: AlFormItem
      }
    })

    expect(wrapper.findComponent(AlFormItem).exists()).toBe(true)
  })
})

describe('AlFormItem', () => {
  it('renders label', () => {
    const wrapper = mount(AlFormItem, {
      props: {
        label: 'Username'
      }
    })

    expect(wrapper.text()).toContain('Username')
  })
})
