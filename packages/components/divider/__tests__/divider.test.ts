import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlDivider } from '../index'

describe('AlDivider', () => {
  it('renders default slot in content', () => {
    const wrapper = mount(AlDivider, {
      slots: {
        default: 'Divider text'
      }
    })

    expect(wrapper.find('.al-divider__content').exists()).toBe(true)
    expect(wrapper.find('.al-divider__content').text()).toContain('Divider text')
  })

  it('does not render content without slot', () => {
    const wrapper = mount(AlDivider)

    expect(wrapper.find('.al-divider__content').exists()).toBe(false)
  })

  it('reflects contentPosition prop into class', () => {
    const wrapper = mount(AlDivider, {
      props: {
        contentPosition: 'left'
      }
    })

    expect(wrapper.classes()).toContain('al-divider--left')
  })

  it('reflects dashed prop into class', () => {
    const wrapper = mount(AlDivider, {
      props: {
        dashed: true
      }
    })

    expect(wrapper.classes()).toContain('is-dashed')
  })

  it('updates dashed class reactively', async () => {
    const wrapper = mount(AlDivider, {
      props: {
        dashed: false
      }
    })

    expect(wrapper.classes()).not.toContain('is-dashed')

    await wrapper.setProps({ dashed: true })

    expect(wrapper.classes()).toContain('is-dashed')
  })
})
