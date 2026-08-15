import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlText, AlTitle } from '../index'

describe('AlText', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlText, {
      slots: {
        default: 'Text content'
      }
    })

    expect(wrapper.find('.al-text').exists()).toBe(true)
    expect(wrapper.text()).toContain('Text content')
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('reflects type prop into class', () => {
    const wrapper = mount(AlText, {
      props: {
        type: 'secondary'
      }
    })

    expect(wrapper.classes()).toContain('al-text--secondary')
  })

  it('reflects truncated prop into class', () => {
    const wrapper = mount(AlText, {
      props: {
        truncated: true
      }
    })

    expect(wrapper.classes()).toContain('is-truncated')
  })
})

describe('AlTitle', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlTitle, {
      slots: {
        default: 'Title content'
      }
    })

    expect(wrapper.find('.al-title').exists()).toBe(true)
    expect(wrapper.text()).toContain('Title content')
  })

  it('renders h1 by default', () => {
    const wrapper = mount(AlTitle)

    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.classes()).toContain('al-title--1')
  })

  it('reflects level prop into rendered tag and class', () => {
    const wrapper = mount(AlTitle, {
      props: {
        level: 3
      }
    })

    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.classes()).toContain('al-title--3')
  })

  it('updates level reactively', async () => {
    const wrapper = mount(AlTitle, {
      props: {
        level: 1
      }
    })

    expect(wrapper.element.tagName).toBe('H1')

    await wrapper.setProps({ level: 4 })

    expect(wrapper.element.tagName).toBe('H4')
    expect(wrapper.classes()).toContain('al-title--4')
  })
})
