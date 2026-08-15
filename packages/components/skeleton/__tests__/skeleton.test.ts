import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlSkeleton } from '../index'

describe('AlSkeleton', () => {
  it('renders skeleton block when loading is true (default)', () => {
    const wrapper = mount(AlSkeleton, {
      props: { variant: 'text' }
    })

    expect(wrapper.find('.al-skeleton').exists()).toBe(true)
  })

  it('reflects variant in class', () => {
    const wrapper = mount(AlSkeleton, {
      props: { variant: 'avatar' }
    })

    expect(wrapper.find('.al-skeleton').classes()).toContain('al-skeleton--avatar')
  })

  it('reflects animated prop with is-animated class', () => {
    const wrapper = mount(AlSkeleton)

    expect(wrapper.find('.al-skeleton').classes()).toContain('is-animated')
  })

  it('renders slot instead of skeleton when loading is false', () => {
    const wrapper = mount(AlSkeleton, {
      props: { loading: false },
      slots: {
        default: 'Loaded'
      }
    })

    expect(wrapper.find('.al-skeleton').exists()).toBe(false)
    expect(wrapper.text()).toContain('Loaded')
  })
})
