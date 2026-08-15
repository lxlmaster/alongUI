import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AlPagination } from '../index'

describe('AlPagination', () => {
  it('renders total text when layout includes total', () => {
    const wrapper = mount(AlPagination, {
      props: { total: 100, layout: 'total, prev, pager, next' }
    })

    expect(wrapper.find('.al-pagination').exists()).toBe(true)
    expect(wrapper.find('.al-pagination__total').exists()).toBe(true)
    expect(wrapper.text()).toContain('共 100 条')
  })

  it('reflects disabled prop as a class', () => {
    const wrapper = mount(AlPagination, {
      props: { total: 100, disabled: true }
    })

    expect(wrapper.classes()).toContain('al-pagination--disabled')
  })

  it('reflects small and background props as classes', () => {
    const wrapper = mount(AlPagination, {
      props: { total: 100, small: true, background: true }
    })

    expect(wrapper.classes()).toContain('al-pagination--small')
    expect(wrapper.classes()).toContain('al-pagination--background')
  })

  it('emits update:current / change when next is clicked', async () => {
    const wrapper = mount(AlPagination, {
      props: { total: 100, current: 1, pageSize: 10 }
    })

    await wrapper.find('.al-pagination__btn--next').trigger('click')

    expect(wrapper.emitted('update:current')).toHaveLength(1)
    expect(wrapper.emitted('update:current')![0]).toEqual([2])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')![0]).toEqual([2, 10])
  })

  it('does not emit when prev is clicked on the first page', async () => {
    const wrapper = mount(AlPagination, {
      props: { total: 100, current: 1, pageSize: 10 }
    })

    await wrapper.find('.al-pagination__btn--prev').trigger('click')

    expect(wrapper.emitted('update:current')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
