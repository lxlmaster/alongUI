import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlSpacer } from '../index'

describe('AlSpacer', () => {
  it('renders as a spacer element', () => {
    const wrapper = mount(AlSpacer)

    expect(wrapper.find('.al-spacer').exists()).toBe(true)
  })
})
