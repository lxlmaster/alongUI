import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlAvatar } from '../index'

describe('AlAvatar', () => {
  it('renders a fallback when no src is provided', () => {
    const wrapper = mount(AlAvatar)

    expect(wrapper.find('.al-avatar__img').exists()).toBe(false)
    expect(wrapper.find('.al-avatar__fallback').exists()).toBe(true)
  })

  it('renders an image when src is provided', () => {
    const wrapper = mount(AlAvatar, {
      props: { src: 'https://example.com/a.png' }
    })

    expect(wrapper.find('.al-avatar__img').exists()).toBe(true)
    expect(wrapper.find('.al-avatar__img').attributes('src')).toBe('https://example.com/a.png')
  })

  it('reflects shape prop in class', () => {
    const wrapper = mount(AlAvatar, {
      props: { shape: 'square' }
    })

    expect(wrapper.classes()).toContain('al-avatar--square')
  })

  it('applies custom numeric size via inline style', () => {
    const wrapper = mount(AlAvatar, {
      props: { size: 64 }
    })

    const style = wrapper.attributes('style') || ''
    expect(style).toContain('64')
  })

  it('emits error event when the image fails to load', async () => {
    const wrapper = mount(AlAvatar, {
      props: { src: 'https://example.com/broken.png' }
    })

    await wrapper.find('.al-avatar__img').trigger('error')

    expect(wrapper.emitted('error')).toHaveLength(1)
  })
})
