import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { AlTable, AlTableColumn } from '../index'

describe('AlTable', () => {
  const sampleData = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 30 }
  ]

  it('renders empty text when data is empty', () => {
    const wrapper = mount(AlTable, {
      props: { data: [] }
    })

    expect(wrapper.find('.al-table').exists()).toBe(true)
    expect(wrapper.find('.al-table__empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('renders rows from the data prop using column definitions', () => {
    const wrapper = mount(AlTable, {
      props: { data: sampleData },
      slots: {
        default: [
          h(AlTableColumn, { prop: 'name', label: 'Name' }),
          h(AlTableColumn, { prop: 'age', label: 'Age' })
        ]
      }
    })

    const rows = wrapper.findAll('.al-table__row')
    expect(rows).toHaveLength(2)
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('30')
    expect(wrapper.find('.al-table__header-label').text()).toBe('Name')
  })

  it('reflects stripe, border and size props as classes', () => {
    const wrapper = mount(AlTable, {
      props: { data: sampleData, stripe: true, border: true, size: 'small' }
    })

    expect(wrapper.classes()).toContain('al-table--stripe')
    expect(wrapper.classes()).toContain('al-table--border')
    expect(wrapper.classes()).toContain('al-table--small')
  })

  it('reflects loading prop as a class and overlay', () => {
    const wrapper = mount(AlTable, {
      props: { data: sampleData, loading: true }
    })

    expect(wrapper.classes()).toContain('al-table--loading')
    expect(wrapper.find('.al-table__loading-overlay').exists()).toBe(true)
  })

  it('emits row-click when a row is clicked', async () => {
    const wrapper = mount(AlTable, {
      props: { data: sampleData },
      slots: {
        default: [h(AlTableColumn, { prop: 'name', label: 'Name' })]
      }
    })

    await wrapper.find('.al-table__row').trigger('click')

    expect(wrapper.emitted('row-click')).toHaveLength(1)
    const payload = wrapper.emitted('row-click')![0] as any[]
    expect(payload[0]).toEqual(sampleData[0])
    expect(payload[1]).toBe(0)
  })
})
