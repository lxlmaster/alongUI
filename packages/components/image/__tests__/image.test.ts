import { describe, expect, it, nextTick } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { AlImage } from '../index'

describe('AlImage', () => {
  it('renders img with reflected src and alt', () => {
    const wrapper = mount(AlImage, {
      props: { src: 'a.png', alt: 'pic' }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('a.png')
    expect(img.attributes('alt')).toBe('pic')
  })

  it('reflects fit as object-fit style', () => {
    const wrapper = mount(AlImage, {
      props: { src: 'a.png', fit: 'contain' }
    })

    expect(wrapper.find('img').attributes('style')).toContain('object-fit: contain')
  })

  it('adds preview class when previewSrcList is provided', () => {
    const wrapper = mount(AlImage, {
      props: { src: 'a.png', previewSrcList: ['a.png'] }
    })

    expect(wrapper.classes()).toContain('al-image--preview')
  })

  it('opens preview overlay on image click', async () => {
    const wrapper = mount(AlImage, {
      props: { src: 'a.png', previewSrcList: ['a.png'] },
      attachTo: document.body
    })

    await wrapper.find('img').trigger('click')
    await flushPromises()
    await nextTick()

    expect(document.querySelector('.al-image__preview-mask')).not.toBeNull()
  })
})
