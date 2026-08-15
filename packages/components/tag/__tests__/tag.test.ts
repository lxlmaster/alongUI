import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlTag } from '../index'

describe('AlTag', () => {
  it('renders default slot', () => {
    const wrapper = mount(AlTag, {
      slots: {
        default: 'Tag'
      }
    })

    expect(wrapper.text()).toContain('Tag')
  })

  it('reflects type, effect and size props in class', () => {
    const wrapper = mount(AlTag, {
      props: {
        type: 'success',
        effect: 'dark',
        size: 'large'
      }
    })

    expect(wrapper.classes()).toContain('al-tag--success')
    expect(wrapper.classes()).toContain('al-tag--dark')
    expect(wrapper.classes()).toContain('al-tag--large')
  })

  it('reflects hit prop with is-hit class', () => {
    const wrapper = mount(AlTag, {
      props: { hit: true }
    })

    expect(wrapper.classes()).toContain('is-hit')
  })

  it('shows close button only when closable', () => {
    const closable = mount(AlTag, { props: { closable: true } })
    const normal = mount(AlTag)

    expect(closable.find('.al-tag__close').exists()).toBe(true)
    expect(normal.find('.al-tag__close').exists()).toBe(false)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(AlTag, {
      props: { closable: true }
    })

    await wrapper.find('.al-tag__close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
