import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { AlMenu, AlMenuItem, AlSubMenu } from '../index'

function createItems() {
  return [
    h(AlMenuItem, { index: '1' }, { default: () => 'Home' }),
    h(AlMenuItem, { index: '2' }, { default: () => 'About' })
  ]
}

describe('AlMenu', () => {
  it('renders menu items inside a menubar', () => {
    const wrapper = mount(AlMenu, {
      slots: { default: createItems() }
    })

    expect(wrapper.classes()).toContain('al-menu')
    expect(wrapper.attributes('role')).toBe('menubar')
    expect(wrapper.findAll('.al-menu-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
  })

  it('uses vertical mode by default', () => {
    const wrapper = mount(AlMenu)

    expect(wrapper.classes()).toContain('al-menu--vertical')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.classes()).not.toContain('is-collapse')
  })

  it('reflects mode and collapse props as classes', () => {
    const wrapper = mount(AlMenu, {
      props: { mode: 'horizontal', collapse: true }
    })

    expect(wrapper.classes()).toContain('al-menu--horizontal')
    expect(wrapper.classes()).toContain('is-collapse')
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('marks the defaultActive item as active', () => {
    const wrapper = mount(AlMenu, {
      props: { defaultActive: '2' },
      slots: { default: createItems() }
    })

    const menuItems = wrapper.findAll('.al-menu-item')
    expect(menuItems[0].classes()).not.toContain('is-active')
    expect(menuItems[1].classes()).toContain('is-active')
  })

  it('emits select and moves the active state when an item is clicked', async () => {
    const wrapper = mount(AlMenu, {
      props: { defaultActive: '1' },
      slots: { default: createItems() }
    })

    const menuItems = wrapper.findAll('.al-menu-item')
    await menuItems[1].trigger('click')

    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')![0]).toEqual(['2', ['2']])
    expect(menuItems[1].classes()).toContain('is-active')
    expect(menuItems[0].classes()).not.toContain('is-active')
  })

  it('does not select a disabled item', async () => {
    const wrapper = mount(AlMenu, {
      slots: {
        default: [h(AlMenuItem, { index: '1', disabled: true }, { default: () => 'Disabled' })]
      }
    })

    const menuItem = wrapper.find('.al-menu-item')
    expect(menuItem.classes()).toContain('is-disabled')
    expect(menuItem.attributes('tabindex')).toBe('-1')

    await menuItem.trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })
})

describe('AlSubMenu', () => {
  function mountSubMenu(props: { mode?: 'vertical' | 'horizontal' } = {}) {
    return mount(AlMenu, {
      props,
      slots: {
        default: [
          h(AlSubMenu, { index: 'sub' }, {
            title: () => 'More',
            default: () => [h(AlMenuItem, { index: 'sub-1' }, { default: () => 'Child' })]
          })
        ]
      }
    })
  }

  it('renders the title slot and starts collapsed', () => {
    const wrapper = mountSubMenu()
    const subMenu = wrapper.find('.al-sub-menu')

    expect(subMenu.exists()).toBe(true)
    expect(subMenu.find('.al-sub-menu__title').text()).toContain('More')
    expect(subMenu.attributes('aria-expanded')).toBe('false')
  })

  it('toggles expansion when the title is clicked', async () => {
    const wrapper = mountSubMenu()
    const subMenu = wrapper.find('.al-sub-menu')
    const title = subMenu.find('.al-sub-menu__title')

    await title.trigger('click')
    expect(subMenu.attributes('aria-expanded')).toBe('true')

    await title.trigger('click')
    expect(subMenu.attributes('aria-expanded')).toBe('false')
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(AlMenu, {
      slots: {
        default: [
          h(AlSubMenu, { index: 'sub', disabled: true }, { title: () => 'More' })
        ]
      }
    })

    const subMenu = wrapper.find('.al-sub-menu')
    expect(subMenu.classes()).toContain('is-disabled')

    await subMenu.find('.al-sub-menu__title').trigger('click')

    expect(subMenu.attributes('aria-expanded')).toBe('false')
  })

  it('expands on hover when the menu is horizontal', async () => {
    const wrapper = mountSubMenu({ mode: 'horizontal' })
    const subMenu = wrapper.find('.al-sub-menu')

    await subMenu.trigger('mouseenter')
    expect(subMenu.attributes('aria-expanded')).toBe('true')

    await subMenu.trigger('mouseleave')
    expect(subMenu.attributes('aria-expanded')).toBe('false')
  })

  it('ignores hover when the menu is vertical', async () => {
    const wrapper = mountSubMenu()
    const subMenu = wrapper.find('.al-sub-menu')

    await subMenu.trigger('mouseenter')

    expect(subMenu.attributes('aria-expanded')).toBe('false')
  })
})
