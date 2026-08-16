import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlUpload } from '../index'

describe('AlUpload', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlUpload, {
      slots: {
        default: 'Upload'
      }
    })

    expect(wrapper.text()).toContain('Upload')
  })

  it('renders a hidden file input with reflected props', () => {
    const wrapper = mount(AlUpload, {
      props: {
        accept: '.png',
        multiple: true
      }
    })

    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('accept')).toBe('.png')
    expect(input.attributes('multiple')).toBeDefined()
  })

  it('reflects disabled state', () => {
    const wrapper = mount(AlUpload, {
      props: { disabled: true }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('renders drag zone when drag is set', () => {
    const wrapper = mount(AlUpload, {
      props: { drag: true }
    })

    expect(wrapper.find('.al-upload__drag').exists()).toBe(true)
  })

  it('adds a file to the list when a file is selected', async () => {
    const wrapper = mount(AlUpload)

    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    Object.defineProperty(input, 'files', {
      value: [new File(['hello'], 'hello.txt', { type: 'text/plain' })],
      configurable: true
    })

    await wrapper.find('input[type="file"]').trigger('change')

    expect(wrapper.findAll('.al-upload__file')).toHaveLength(1)
    expect(wrapper.emitted('onChange')).toHaveLength(1)
  })

  it('opens the file dialog on trigger click', async () => {
    const wrapper = mount(AlUpload)

    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')

    await wrapper.find('.al-upload__trigger').trigger('click')

    expect(clickSpy).toHaveBeenCalled()
  })
})
