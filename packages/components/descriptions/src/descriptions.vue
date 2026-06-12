<template>
  <div class="al-descriptions">
    <div v-if="title || $slots.title" class="al-descriptions__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="al-descriptions__body"
      :class="{ 'al-descriptions--border': border }"
    >
      <table class="al-descriptions__table">
        <tbody>
          <tr
            v-for="(row, rowIdx) in rows"
            :key="rowIdx"
            class="al-descriptions__row"
          >
            <template v-for="(cell, cellIdx) in row" :key="cellIdx">
              <td
                v-if="cell"
                class="al-descriptions__label"
                :colspan="cell.labelColspan || 1"
              >
                {{ cell.label }}
              </td>
              <td
                v-if="cell"
                class="al-descriptions__value"
                :colspan="cell.valueColspan || 1"
              >
                <DescriptionsContent :nodes="cell.content" />
              </td>
            </template>
            <td
              v-for="i in emptyCells(row)"
              :key="'empty-' + i"
              class="al-descriptions__cell al-descriptions__cell--empty"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  createTextVNode,
  defineComponent,
  type PropType,
  type Slots,
  type VNode,
  useSlots
} from 'vue'
import { descriptionsProps } from './descriptions'

defineOptions({
  name: 'AlDescriptions'
})

const props = defineProps(descriptionsProps)
const slots = useSlots()

interface CellInfo {
  label: string
  content: VNode[]
  span: number
  labelColspan?: number
  valueColspan?: number
}

const DescriptionsContent = defineComponent({
  name: 'DescriptionsContent',
  props: {
    nodes: {
      type: Array as PropType<VNode[]>,
      default: () => []
    }
  },
  setup(innerProps) {
    return () => innerProps.nodes
  }
})

const items = computed<CellInfo[]>(() => {
  const children = flattenNodes(slots.default?.() ?? [])

  return children
    .filter(isDescriptionsItem)
    .map((node) => {
      const label = typeof node.props?.label === 'string' ? node.props.label : ''
      const span = Math.max(Number(node.props?.span ?? 1), 1)

      return {
        label,
        span,
        content: resolveItemContent(node)
      }
    })
})

const rows = computed(() => {
  const col = Math.max(props.column, 1)
  const result: CellInfo[][] = []
  let currentRow: CellInfo[] = []
  let cellCount = 0

  for (const sourceItem of items.value) {
    const span = Math.min(sourceItem.span, col)
    const item: CellInfo = {
      ...sourceItem,
      span,
      labelColspan: 1,
      valueColspan: Math.max(span * 2 - 1, 1)
    }

    if (cellCount + span > col) {
      if (currentRow.length > 0) {
        finalizeRow(currentRow, cellCount, col)
        result.push(currentRow)
      }
      currentRow = [item]
      cellCount = span
    } else {
      currentRow.push(item)
      cellCount += span
    }
  }

  if (currentRow.length > 0) {
    finalizeRow(currentRow, cellCount, col)
    result.push(currentRow)
  }

  return result
})

function flattenNodes(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Comment) {
      return []
    }

    if (node.type === Fragment) {
      const children = Array.isArray(node.children) ? node.children : []
      return flattenNodes(children as VNode[])
    }

    if (node.type === Text && typeof node.children === 'string' && node.children.trim() === '') {
      return []
    }

    return [node]
  })
}

function isDescriptionsItem(node: VNode) {
  const type = node.type as { name?: string; __name?: string }
  return type?.name === 'AlDescriptionsItem' || type?.__name === 'AlDescriptionsItem'
}

function resolveItemContent(node: VNode) {
  if (typeof node.children === 'string') {
    return [createTextVNode(node.children)]
  }

  if (typeof node.children === 'object' && node.children) {
    const defaultSlot = (node.children as Slots).default
    if (defaultSlot) {
      return flattenNodes(defaultSlot())
    }
  }

  return []
}

function finalizeRow(row: CellInfo[], usedColumns: number, totalColumns: number) {
  const remaining = totalColumns - usedColumns
  if (remaining <= 0) {
    return
  }

  const last = row[row.length - 1]
  if (last) {
    last.valueColspan = (last.valueColspan || 1) + remaining * 2
  }
}

function emptyCells(row: CellInfo[]) {
  const count = row.reduce((sum, cell) => sum + (cell.labelColspan || 1) + (cell.valueColspan || 1), 0)
  const expected = props.column * 2
  const empty = expected - count
  return empty > 0 ? empty : 0
}
</script>
