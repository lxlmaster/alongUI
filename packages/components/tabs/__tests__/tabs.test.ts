import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { AlTabPane, AlTabs } from '../index'

function createPanes(secondProps: { disabled?: boolean; closable?: boolean } = {}) {
  return [
    h(AlTabPane, { name: 'first', label: 'First' }, { default: () => 'Pane one' }),
    h(AlTabPane, { name: 'second', label: 'Second', ...secondProps }, { default: () => 'Pane two' })
  ]
}

describe('AlTabs', () => {
  it('renders a nav item for every registered pane', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first' },
      slots: { default: createPanes() }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('al-tabs')
    const navItems = wrapper.findAll('.al-tabs__item')
    expect(navItems).toHaveLength(2)
    expect(navItems[0].text()).toContain('First')
    expect(navItems[1].text()).toContain('Second')
    expect(wrapper.findAll('.al-tab-pane')).toHaveLength(2)
  })

  it('marks the pane matching modelValue as active', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'second' },
      slots: { default: createPanes() }
    })

    await nextTick()

    const navItems = wrapper.findAll('.al-tabs__item')
    expect(navItems[0].classes()).not.toContain('is-active')
    expect(navItems[1].classes()).toContain('is-active')
    expect(navItems[1].attributes('aria-selected')).toBe('true')

    const panes = wrapper.findAll('.al-tab-pane')
    expect(panes[0].isVisible()).toBe(false)
    expect(panes[1].isVisible()).toBe(true)
  })

  it('falls back to the first pane when modelValue is empty', async () => {
    const wrapper = mount(AlTabs, {
      slots: { default: createPanes() }
    })

    await nextTick()

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['first'])
    expect(wrapper.findAll('.al-tabs__item')[0].classes()).toContain('is-active')
  })

  it('uses line type and top position by default', () => {
    const wrapper = mount(AlTabs)

    expect(wrapper.classes()).toContain('al-tabs--line')
    expect(wrapper.classes()).toContain('al-tabs--top')
    expect(wrapper.find('.al-tabs__active-bar').exists()).toBe(true)
  })

  it('reflects type and tabPosition props', async () => {
    const wrapper = mount(AlTabs, {
      props: { type: 'card', tabPosition: 'left', modelValue: 'first' },
      slots: { default: createPanes() }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('al-tabs--card')
    expect(wrapper.classes()).toContain('al-tabs--left')
    expect(wrapper.find('.al-tabs__header').classes()).toContain('al-tabs__header--left')
    expect(wrapper.find('.al-tabs__active-bar').exists()).toBe(false)
    expect(wrapper.findAll('.al-tabs__item')[0].classes()).toContain('al-tabs__item--card')
  })

  it('switches the active tab on click', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first' },
      slots: { default: createPanes() }
    })

    await nextTick()

    const navItems = wrapper.findAll('.al-tabs__item')
    await navItems[1].trigger('click')

    expect(wrapper.emitted('tab-click')).toHaveLength(1)
    expect(wrapper.emitted('tab-click')![0]).toEqual(['second'])

    const updates = wrapper.emitted('update:modelValue')!
    expect(updates[updates.length - 1]).toEqual(['second'])
    expect(wrapper.findAll('.al-tabs__item')[1].classes()).toContain('is-active')
  })

  it('ignores clicks on a disabled pane', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first' },
      slots: { default: createPanes({ disabled: true }) }
    })

    await nextTick()

    const disabledItem = wrapper.findAll('.al-tabs__item')[1]
    expect(disabledItem.classes()).toContain('is-disabled')
    expect(disabledItem.attributes('tabindex')).toBe('-1')

    await disabledItem.trigger('click')

    expect(wrapper.emitted('tab-click')).toBeUndefined()
  })

  it('emits tab-remove from the close button when closable', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first', closable: true },
      slots: { default: createPanes() }
    })

    await nextTick()

    const closeButtons = wrapper.findAll('.al-tabs__close')
    expect(closeButtons).toHaveLength(2)

    await closeButtons[0].trigger('click')

    expect(wrapper.emitted('tab-remove')).toHaveLength(1)
    expect(wrapper.emitted('tab-remove')![0]).toEqual(['first'])
    expect(wrapper.emitted('tab-click')).toBeUndefined()
  })

  it('emits tab-add from the add button when addable', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first', addable: true },
      slots: { default: createPanes() }
    })

    await nextTick()

    const addButton = wrapper.find('.al-tabs__add-btn')
    expect(addButton.exists()).toBe(true)

    await addButton.trigger('click')

    expect(wrapper.emitted('tab-add')).toHaveLength(1)
  })

  it('follows modelValue updates from the parent', async () => {
    const wrapper = mount(AlTabs, {
      props: { modelValue: 'first' },
      slots: { default: createPanes() }
    })

    await nextTick()
    await wrapper.setProps({ modelValue: 'second' })

    const navItems = wrapper.findAll('.al-tabs__item')
    expect(navItems[1].classes()).toContain('is-active')
    expect(wrapper.findAll('.al-tab-pane')[1].isVisible()).toBe(true)
  })
})
