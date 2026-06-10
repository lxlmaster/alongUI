import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlTooltip } from '../index'

describe('AlTooltip', () => {
  it('shows content on hover', async () => {
    const wrapper = mount(AlTooltip, {
      props: {
        content: 'Tip'
      },
      slots: {
        default: '<button>trigger</button>'
      }
    })

    await wrapper.trigger('mouseenter')

    expect(wrapper.text()).toContain('Tip')
  })

  it('does not show when disabled', async () => {
    const wrapper = mount(AlTooltip, {
      props: {
        content: 'Tip',
        disabled: true
      },
      slots: {
        default: '<button>trigger</button>'
      }
    })

    await wrapper.trigger('mouseenter')

    expect(wrapper.text()).not.toContain('Tip')
  })
})

