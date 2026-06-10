<template>
  <!-- TableColumn is a renderless component that registers itself with parent table -->
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { tableContextKey, type ColumnInfo } from './table'

defineOptions({
  name: 'AlTableColumn'
})

const props = defineProps({
  prop: { type: String, default: undefined },
  label: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  fixed: { type: String as import('vue').PropType<'left' | 'right'>, default: undefined },
  sortable: Boolean,
  align: { type: String as import('vue').PropType<'left' | 'center' | 'right'>, default: 'left' }
})

const slots = defineSlots()

const context = inject(tableContextKey)

if (context) {
  onMounted(() => {
    const column: ColumnInfo = {
      id: `col-${Math.random().toString(36).slice(2, 9)}`,
      prop: props.prop,
      label: props.label,
      width: props.width,
      fixed: props.fixed,
      sortable: props.sortable,
      align: props.align,
      renderSlot: slots.default ?? null
    }
    context.registerColumn(column)
  })
}
</script>
