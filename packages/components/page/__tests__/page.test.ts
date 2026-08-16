import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlPage } from '../index'

describe('AlPage', () => {
  it('renders default body slot', () => {
    const wrapper = mount(AlPage, {
      slots: { default: 'body' }
    })

    expect(wrapper.find('.al-page__body').exists()).toBe(true)
    expect(wrapper.text()).toContain('body')
  })

  it('renders header and actions slots when provided', () => {
    const wrapper = mount(AlPage, {
      slots: {
        header: 'header',
        default: 'body',
        actions: 'actions'
      }
    })

    expect(wrapper.find('.al-page__header').text()).toContain('header')
    expect(wrapper.find('.al-page__actions').text()).toContain('actions')
  })
})
