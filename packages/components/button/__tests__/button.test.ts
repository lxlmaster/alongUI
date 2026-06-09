import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlButton } from '../index'

describe('AlButton', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlButton, {
      slots: {
        default: 'Button'
      }
    })

    expect(wrapper.text()).toContain('Button')
  })

  it('emits click event', async () => {
    const wrapper = mount(AlButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AlButton, {
      props: {
        disabled: true
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

