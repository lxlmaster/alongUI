import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlVideo } from '../index'

describe('AlVideo', () => {
  it('renders video element with src', () => {
    const wrapper = mount(AlVideo, {
      props: {
        src: 'demo.mp4'
      }
    })

    const video = wrapper.find('video')
    expect(video.exists()).toBe(true)
    expect(video.attributes('src')).toBe('demo.mp4')
  })

  it('applies width and height styles', () => {
    const wrapper = mount(AlVideo, {
      props: {
        src: 'demo.mp4',
        width: 320,
        height: 180
      }
    })

    const video = wrapper.find('video')
    expect(video.attributes('style')).toContain('width: 320px;')
    expect(video.attributes('style')).toContain('height: 180px;')
  })
})
