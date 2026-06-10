import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlRadio } from '../index'

describe('AlRadio', () => {
  it('renders label', () => {
    const wrapper = mount(AlRadio, {
      props: {
        label: 'Option A'
      }
    })

    expect(wrapper.text()).toContain('Option A')
  })

  it('can be selected', async () => {
    let wrapper: ReturnType<typeof mount>
    wrapper = mount(AlRadio, {
      props: {
        label: 'A',
        modelValue: '',
        'onUpdate:modelValue': (value: string | number | boolean) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled prop', () => {
    const wrapper = mount(AlRadio, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('input').element.disabled).toBe(true)
  })
})
