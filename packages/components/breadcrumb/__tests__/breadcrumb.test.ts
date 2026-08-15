import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { AlBreadcrumb, AlBreadcrumbItem } from '../index'

function createItems() {
  return [
    h(AlBreadcrumbItem, null, { default: () => 'Home' }),
    h(AlBreadcrumbItem, null, { default: () => 'List' }),
    h(AlBreadcrumbItem, null, { default: () => 'Detail' })
  ]
}

describe('AlBreadcrumb', () => {
  it('renders items inside a labelled nav list', () => {
    const wrapper = mount(AlBreadcrumb, {
      slots: { default: createItems() }
    })

    expect(wrapper.classes()).toContain('al-breadcrumb')
    expect(wrapper.attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.find('.al-breadcrumb__list').exists()).toBe(true)
    expect(wrapper.findAll('.al-breadcrumb__item')).toHaveLength(3)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Detail')
  })

  it('uses a slash separator by default', () => {
    const wrapper = mount(AlBreadcrumb, {
      slots: { default: createItems() }
    })

    const separators = wrapper.findAll('.al-breadcrumb__separator')
    expect(separators).toHaveLength(3)
    expect(separators[0].text()).toBe('/')
    expect(separators[0].attributes('aria-hidden')).toBe('true')
  })

  it('reflects the separator prop on every item', () => {
    const wrapper = mount(AlBreadcrumb, {
      props: { separator: '>' },
      slots: { default: createItems() }
    })

    const separators = wrapper.findAll('.al-breadcrumb__separator')
    expect(separators).toHaveLength(3)
    separators.forEach((separator) => {
      expect(separator.text()).toBe('>')
    })
  })
})

describe('AlBreadcrumbItem', () => {
  it('marks an item with `to` as a link', () => {
    const wrapper = mount(AlBreadcrumb, {
      slots: {
        default: [
          h(AlBreadcrumbItem, { to: '/home' }, { default: () => 'Home' }),
          h(AlBreadcrumbItem, null, { default: () => 'Current' })
        ]
      }
    })

    const inners = wrapper.findAll('.al-breadcrumb__inner')
    expect(inners[0].classes()).toContain('is-link')
    expect(inners[0].attributes('tabindex')).toBe('0')
    expect(inners[1].classes()).not.toContain('is-link')
    expect(inners[1].attributes('tabindex')).toBeUndefined()
  })

  it('accepts an object `to` value', () => {
    const wrapper = mount(AlBreadcrumb, {
      slots: {
        default: [h(AlBreadcrumbItem, { to: { path: '/list' } }, { default: () => 'List' })]
      }
    })

    expect(wrapper.find('.al-breadcrumb__inner').classes()).toContain('is-link')
  })

  it('does not navigate when an item without `to` is clicked', async () => {
    const wrapper = mount(AlBreadcrumb, {
      slots: { default: [h(AlBreadcrumbItem, null, { default: () => 'Current' })] }
    })

    const before = window.location.href
    await wrapper.find('.al-breadcrumb__inner').trigger('click')

    expect(window.location.href).toBe(before)
  })
})
