<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  ref,
  useSlots,
  type CSSProperties,
  type VNode
} from 'vue'
import { tableEmits, tableProps, type ColumnInfo, type SortState } from './table'

type SlotMap = {
  default?: (...args: any[]) => any
}

export default defineComponent({
  name: 'AlTable',
  props: tableProps,
  emits: tableEmits,
  setup(props, { emit }) {
    const tableWrapper = ref<HTMLElement>()
    const currentRowIndex = ref(-1)
    const sortState = ref<SortState>({ prop: null, order: null })

    const maxHeightPx = computed(() => {
      if (props.maxHeight === undefined) return undefined
      return typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    })

    function buildColumns(): ColumnInfo[] {
      const slots = useSlots()
      const defaultSlot = slots.default
      if (!defaultSlot) return []
      const children: VNode[] = defaultSlot()
      return children
        .filter(child => child.props)
        .map(child => ({
          id: `col-${child.key != null ? String(child.key) : Math.random().toString(36).slice(2, 9)}`,
          prop: child.props!.prop,
          label: child.props!.label ?? '',
          width: child.props!.width,
          fixed: child.props!.fixed,
          sortable: !!child.props!.sortable,
          align: child.props!.align ?? 'left',
          renderSlot: resolveRenderSlot(child)
        }))
    }

    function resolveRenderSlot(child: VNode) {
      const slotFromProps = child.props?.['v-slots'] as SlotMap | undefined
      if (slotFromProps?.default) {
        return slotFromProps.default
      }

      if (child.children && typeof child.children === 'object' && !Array.isArray(child.children)) {
        const rawSlots = child.children as SlotMap
        return rawSlots.default
      }

      return undefined
    }

    function getSlotFn(columns: ColumnInfo[], col: ColumnInfo) {
      const match = columns.find(c => c.id === col.id)
      return match?.renderSlot
    }

    function handleSort(columns: ColumnInfo[], col: ColumnInfo) {
      if (!col.prop) return
      if (sortState.value.prop !== col.prop) {
        sortState.value = { prop: col.prop, order: 'asc' }
      } else if (sortState.value.order === 'asc') {
        sortState.value = { prop: col.prop, order: 'desc' }
      } else {
        sortState.value = { prop: col.prop, order: null }
      }
    }

    function handleRowClick(row: any, index: number) {
      currentRowIndex.value = index
      emit('row-click', row, index)
    }

    function colWidthStyle(col: ColumnInfo): CSSProperties | undefined {
      if (col.width) {
        const w = typeof col.width === 'number' ? `${col.width}px` : col.width
        return { width: w }
      }
      return undefined
    }

    function fixedColStyle(col: ColumnInfo): CSSProperties | undefined {
      if (col.fixed === 'left' || col.fixed === 'right') {
        return { position: 'sticky', [col.fixed]: '0px', zIndex: 2 }
      }
      return undefined
    }

    return {
      tableWrapper,
      sortState,
      currentRowIndex,
      maxHeightPx,
      buildColumns,
      getSlotFn,
      handleSort,
      handleRowClick,
      colWidthStyle,
      fixedColStyle
    }
  },
  render() {
    const columns = this.buildColumns()
    const sortedData = (() => {
      const data = this.$props.data ?? []
      if (!this.sortState.prop || !this.sortState.order) return data
      return [...data].sort((a: any, b: any) => {
        const aVal = a[this.sortState.prop!]
        const bVal = b[this.sortState.prop!]
        if (aVal == null) return 1
        if (bVal == null) return -1
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const cmp = aVal.localeCompare(bVal)
          return this.sortState.order === 'asc' ? cmp : -cmp
        }
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return this.sortState.order === 'asc' ? cmp : -cmp
      })
    })()

    return h('div', {
      ref: 'tableWrapper',
      class: [
        'al-table',
        `al-table--${this.$props.size}`,
        {
          'al-table--border': this.$props.border,
          'al-table--stripe': this.$props.stripe,
          'al-table--loading': this.$props.loading
        }
      ]
    }, [
      h('div', {
        class: ['al-table__body-wrapper', { 'al-table__body-wrapper--scrollable': this.$props.maxHeight !== undefined }],
        style: this.$props.maxHeight !== undefined ? { maxHeight: this.maxHeightPx } : undefined
      }, [
        h('table', { class: 'al-table__table' }, [
          h('colgroup', columns.map(col => h('col', { style: this.colWidthStyle(col), key: col.id }))),
          h('thead', { class: 'al-table__header' }, [
            h('tr', columns.map(col => h('th', {
              key: col.id,
              class: ['al-table__cell', 'al-table__header-cell', `al-table__cell--align-${col.align}`, col.fixed ? `al-table__cell--fixed-${col.fixed}` : ''],
              style: this.fixedColStyle(col),
              tabindex: col.sortable ? 0 : -1,
              onClick: () => col.sortable && this.handleSort(columns, col),
              onKeydown: (e: KeyboardEvent) => {
                if ((e.key === 'Enter' || e.key === ' ') && col.sortable) {
                  e.preventDefault()
                  this.handleSort(columns, col)
                }
              }
            }, [
              h('span', { class: 'al-table__header-label' }, col.label),
              col.sortable && h('span', { class: 'al-table__sort-icons', 'aria-hidden': 'true' }, [
                h('svg', { class: ['al-table__sort-icon', { 'al-table__sort-icon--active': this.sortState.prop === col.prop && this.sortState.order === 'asc' }], width: '10', height: '6', viewBox: '0 0 10 6', fill: 'currentColor' }, [h('path', { d: 'M5 0L10 6H0z' })]),
                h('svg', { class: ['al-table__sort-icon', { 'al-table__sort-icon--active': this.sortState.prop === col.prop && this.sortState.order === 'desc' }], width: '10', height: '6', viewBox: '0 0 10 6', fill: 'currentColor' }, [h('path', { d: 'M5 6L0 0h10z' })])
              ])
            ]))
          )]),
          h('tbody', { class: 'al-table__body' }, [
            sortedData.length > 0 ? sortedData.map((row: any, rowIndex: number) => h('tr', {
              key: this.$props.rowKey ? row[this.$props.rowKey] : rowIndex,
              class: ['al-table__row', { 'al-table__row--stripe': this.$props.stripe && rowIndex % 2 === 1, 'al-table__row--highlight': this.$props.highlightCurrentRow && this.currentRowIndex === rowIndex }],
              onClick: () => this.handleRowClick(row, rowIndex)
            }, columns.map(col => {
              const slotFn = this.getSlotFn(columns, col)
              return h('td', {
                key: col.id,
                class: ['al-table__cell', `al-table__cell--align-${col.align}`, col.fixed ? `al-table__cell--fixed-${col.fixed}` : ''],
                style: this.fixedColStyle(col)
              }, slotFn ? slotFn({ row }) : (col.prop ? row[col.prop] : ''))
            }))) : h('tr', [h('td', { class: ['al-table__cell', 'al-table__empty'], colSpan: columns.length }, this.$props.emptyText)])
          ])
        ])
      ]),
      this.$props.loading && h('div', { class: 'al-table__loading-overlay' }, [h('div', { class: 'al-table__spinner' })])
    ])
  }
})
</script>
