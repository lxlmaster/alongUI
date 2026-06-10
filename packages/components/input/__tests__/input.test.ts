import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlInput } from '../index'

describe('AlInput', () => {
  it('renders model value', () => {
    const wrapper = mount(AlInput, {
      props: {
        modelValue: 'alongUI'
      }
    })

    expect(wrapper.find('input').element.value).toBe('alongUI')
  })

  it('emits update event on input', async () => {
    const wrapper = mount(AlInput)

    await wrapper.find('input').setValue('Apple')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Apple'])
  })

  it('clears value when clearable', async () => {
    const wrapper = mount(AlInput, {
      props: {
        modelValue: 'clear me',
        clearable: true
      }
    })

    await wrapper.find('.al-input__clear').trigger('click')

    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('renders textarea', () => {
    const wrapper = mount(AlInput, {
      props: {
        type: 'textarea',
        modelValue: 'textarea'
      }
    })

    expect(wrapper.find('textarea').element.value).toBe('textarea')
  })
})

