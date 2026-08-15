import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlProgress } from '../index'

describe('AlProgress', () => {
  it('renders with default line type', () => {
    const wrapper = mount(AlProgress, {
      props: { percentage: 50 }
    })

    expect(wrapper.classes()).toContain('al-progress--line')
    expect(wrapper.find('.al-progress__bar').exists()).toBe(true)
  })

  it('reflects percentage in the info text', () => {
    const wrapper = mount(AlProgress, {
      props: { percentage: 42 }
    })

    expect(wrapper.find('.al-progress__info').text()).toBe('42%')
  })

  it('reflects strokeColor on the bar inner element', () => {
    const wrapper = mount(AlProgress, {
      props: { percentage: 30, strokeColor: '#ff0000' }
    })

    expect(wrapper.find('.al-progress__bar-inner').attributes('style')).toContain('#ff0000')
  })

  it('renders circle type and reflects type class', () => {
    const wrapper = mount(AlProgress, {
      props: { type: 'circle', percentage: 30 }
    })

    expect(wrapper.classes()).toContain('al-progress--circle')
    expect(wrapper.find('.al-progress__circle').exists()).toBe(true)
  })

  it('hides info text when showInfo is false', () => {
    const wrapper = mount(AlProgress, {
      props: { percentage: 30, showInfo: false }
    })

    expect(wrapper.find('.al-progress__info').exists()).toBe(false)
  })
})
