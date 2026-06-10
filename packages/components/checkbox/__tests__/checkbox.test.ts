import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlCheckbox } from '../index'

describe('AlCheckbox', () => {
  it('renders label', () => {
    const wrapper = mount(AlCheckbox, {
      props: {
        label: 'Option A'
      }
    })

    expect(wrapper.text()).toContain('Option A')
  })

  it('can be checked', async () => {
    let wrapper: ReturnType<typeof mount>
    wrapper = mount(AlCheckbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (value: string | number | boolean) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled prop', () => {
    const wrapper = mount(AlCheckbox, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('input').element.disabled).toBe(true)
  })
})
