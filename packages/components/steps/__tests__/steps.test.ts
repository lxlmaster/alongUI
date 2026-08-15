import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { AlStep, AlSteps } from '../index'

function createSteps() {
  return [
    h(AlStep, { title: 'One', description: 'First step' }),
    h(AlStep, { title: 'Two' }),
    h(AlStep, { title: 'Three' })
  ]
}

describe('AlSteps', () => {
  it('renders one step per child with its title', async () => {
    const wrapper = mount(AlSteps, {
      slots: { default: createSteps() }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('al-steps')
    const steps = wrapper.findAll('.al-step')
    expect(steps).toHaveLength(3)
    expect(steps[0].find('.al-step__title').text()).toBe('One')
    expect(steps[1].find('.al-step__title').text()).toBe('Two')
    expect(steps[2].find('.al-step__title').text()).toBe('Three')
  })

  it('numbers steps in registration order', async () => {
    const wrapper = mount(AlSteps, {
      slots: { default: createSteps() }
    })

    await nextTick()

    const numbers = wrapper.findAll('.al-step__number').map(node => node.text())
    expect(numbers).toEqual(['1', '2', '3'])
  })

  it('uses horizontal direction and default size by default', () => {
    const wrapper = mount(AlSteps, {
      slots: { default: [h(AlStep, { title: 'One' })] }
    })

    expect(wrapper.classes()).toContain('al-steps--horizontal')
    expect(wrapper.classes()).toContain('al-steps--default')

    const step = wrapper.find('.al-step')
    expect(step.classes()).toContain('al-step--horizontal')
    expect(step.classes()).toContain('al-step--default')
  })

  it('reflects direction and size props on root and steps', () => {
    const wrapper = mount(AlSteps, {
      props: { direction: 'vertical', size: 'small' },
      slots: { default: [h(AlStep, { title: 'One' })] }
    })

    expect(wrapper.classes()).toContain('al-steps--vertical')
    expect(wrapper.classes()).toContain('al-steps--small')

    const step = wrapper.find('.al-step')
    expect(step.classes()).toContain('al-step--vertical')
    expect(step.classes()).toContain('al-step--small')
  })

  it('derives finish / process / wait status from the current prop', async () => {
    const wrapper = mount(AlSteps, {
      props: { current: 1 },
      slots: { default: createSteps() }
    })

    await nextTick()

    const steps = wrapper.findAll('.al-step')
    expect(steps[0].classes()).toContain('al-step--finish')
    expect(steps[1].classes()).toContain('al-step--process')
    expect(steps[2].classes()).toContain('al-step--wait')
  })

  it('shows a check mark instead of a number on finished steps', async () => {
    const wrapper = mount(AlSteps, {
      props: { current: 1 },
      slots: { default: createSteps() }
    })

    await nextTick()

    const steps = wrapper.findAll('.al-step')
    expect(steps[0].find('.al-step__check').exists()).toBe(true)
    expect(steps[0].find('.al-step__number').exists()).toBe(false)
    expect(steps[1].find('.al-step__number').text()).toBe('2')
  })

  it('treats the first step as current when current is 0', async () => {
    const wrapper = mount(AlSteps, {
      slots: { default: createSteps() }
    })

    await nextTick()

    const steps = wrapper.findAll('.al-step')
    expect(steps[0].classes()).toContain('al-step--process')
    expect(steps[1].classes()).toContain('al-step--wait')
  })

  it('updates the root modifier class when the direction prop changes', async () => {
    const wrapper = mount(AlSteps, {
      slots: { default: [h(AlStep, { title: 'One' })] }
    })

    await wrapper.setProps({ direction: 'vertical' })

    expect(wrapper.classes()).toContain('al-steps--vertical')
    expect(wrapper.classes()).not.toContain('al-steps--horizontal')
  })
})

describe('AlStep', () => {
  it('renders the description only when provided', async () => {
    const wrapper = mount(AlSteps, {
      slots: { default: createSteps() }
    })

    await nextTick()

    const steps = wrapper.findAll('.al-step')
    expect(steps[0].find('.al-step__description').text()).toBe('First step')
    expect(steps[1].find('.al-step__description').exists()).toBe(false)
  })

  it('lets the status prop override the derived status', async () => {
    const wrapper = mount(AlSteps, {
      props: { current: 0 },
      slots: { default: [h(AlStep, { title: 'Failed', status: 'error' })] }
    })

    await nextTick()

    const step = wrapper.find('.al-step')
    expect(step.classes()).toContain('al-step--error')
    expect(step.classes()).not.toContain('al-step--process')
  })

  it('renders a custom icon slot in place of the number', async () => {
    const wrapper = mount(AlSteps, {
      slots: {
        default: [
          h(AlStep, { title: 'One' }, { icon: () => h('i', { class: 'custom-icon' }, 'x') })
        ]
      }
    })

    await nextTick()

    expect(wrapper.find('.al-step__circle').classes()).toContain('is-icon')
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.al-step__number').exists()).toBe(false)
  })
})
