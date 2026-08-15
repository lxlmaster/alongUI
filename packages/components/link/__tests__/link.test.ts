import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlLink } from '../index'

describe('AlLink', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlLink, {
      slots: {
        default: 'Link text'
      }
    })

    expect(wrapper.text()).toContain('Link text')
    expect(wrapper.element.tagName).toBe('A')
  })

  it('reflects type prop into class', () => {
    const wrapper = mount(AlLink, {
      props: {
        type: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('al-link--primary')
  })

  it('binds href and target when not disabled', () => {
    const wrapper = mount(AlLink, {
      props: {
        href: 'https://example.com',
        target: '_blank'
      }
    })

    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('removes href and target when disabled', () => {
    const wrapper = mount(AlLink, {
      props: {
        href: 'https://example.com',
        disabled: true
      }
    })

    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('emits click event', async () => {
    const wrapper = mount(AlLink)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AlLink, {
      props: {
        disabled: true
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
