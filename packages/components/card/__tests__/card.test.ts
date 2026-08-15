import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlCard } from '../index'

describe('AlCard', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlCard, {
      slots: {
        default: 'Card content'
      }
    })

    expect(wrapper.text()).toContain('Card content')
    expect(wrapper.find('.al-card__body').exists()).toBe(true)
  })

  it('renders header prop', () => {
    const wrapper = mount(AlCard, {
      props: {
        header: 'Card header'
      }
    })

    expect(wrapper.find('.al-card__header').exists()).toBe(true)
    expect(wrapper.find('.al-card__header').text()).toContain('Card header')
  })

  it('reflects shadow prop into class', () => {
    const wrapper = mount(AlCard, {
      props: {
        shadow: 'hover'
      }
    })

    expect(wrapper.classes()).toContain('is-hover-shadow')
  })

  it('does not render header when header prop and slot are absent', () => {
    const wrapper = mount(AlCard)

    expect(wrapper.find('.al-card__header').exists()).toBe(false)
  })

  it('updates shadow class reactively', async () => {
    const wrapper = mount(AlCard, {
      props: {
        shadow: 'always'
      }
    })

    expect(wrapper.classes()).toContain('is-always-shadow')

    await wrapper.setProps({ shadow: 'never' })

    expect(wrapper.classes()).toContain('is-never-shadow')
    expect(wrapper.classes()).not.toContain('is-always-shadow')
  })
})
