import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlSwitch } from '../index'

describe('AlSwitch', () => {
  it('renders switch state', () => {
    const wrapper = mount(AlSwitch, {
      props: {
        modelValue: true
      }
    })

    expect(wrapper.attributes('role')).toBe('switch')
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('emits update and change events on click', async () => {
    const wrapper = mount(AlSwitch, {
      props: {
        modelValue: false
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(AlSwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('renders active and inactive text', () => {
    const wrapper = mount(AlSwitch, {
      props: {
        activeText: '开启',
        inactiveText: '关闭'
      }
    })

    expect(wrapper.text()).toContain('开启')
    expect(wrapper.text()).toContain('关闭')
  })
})
