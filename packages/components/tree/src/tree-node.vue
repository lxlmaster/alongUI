<template>
  <div
    class="al-tree-node"
    :class="{
      'al-tree-node--selected': nodeState.checked,
      'al-tree-node--disabled': nodeState.node.disabled,
      'al-tree-node--drag-over': isDragOver
    }"
    :style="{ paddingLeft: `${nodeState.level * 20 + 8}px` }"
    :draggable="draggable && !nodeState.node.disabled"
    role="treeitem"
    :aria-expanded="hasChildren ? nodeState.expanded : undefined"
    :aria-selected="nodeState.checked"
    @click="handleClick"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragend="onDragEnd"
  >
    <!-- Expand/Collapse icon -->
    <span
      v-if="hasChildren"
      class="al-tree-node__arrow"
      :class="{ 'al-tree-node__arrow--expanded': nodeState.expanded }"
      @click.stop="handleToggle"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
    <span v-else class="al-tree-node__arrow-placeholder" />

    <!-- Checkbox -->
    <span
      v-if="showCheckbox"
      class="al-tree-node__checkbox"
      :class="{
        'is-checked': nodeState.checked,
        'is-indeterminate': nodeState.indeterminate
      }"
      @click.stop="handleCheck"
    >
      <svg v-if="nodeState.checked" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span v-else-if="nodeState.indeterminate" class="al-tree-node__checkbox-minus" />
    </span>

    <!-- Label -->
    <span class="al-tree-node__label">{{ nodeState.node.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNodeState } from './tree'

defineOptions({
  name: 'AlTreeNode'
})

const props = defineProps<{
  nodeState: TreeNodeState
  showCheckbox: boolean
  draggable: boolean
}>()

const emit = defineEmits<{
  toggle: []
  check: []
  'node-drag-start': [event: DragEvent]
  'node-drag-over': [event: DragEvent]
  'node-drop': [event: DragEvent]
}>()

const isDragOver = ref(false)
const hasChildren = computed(() => {
  return props.nodeState.node.children && props.nodeState.node.children.length > 0
})

function handleClick() {
  if (props.nodeState.node.disabled) return
}

function handleToggle() {
  if (props.nodeState.node.disabled) return
  emit('toggle')
}

function handleCheck() {
  if (props.nodeState.node.disabled) return
  emit('check')
}

function onDragStart(event: DragEvent) {
  isDragOver.value = false
  emit('node-drag-start', event)
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
  emit('node-drag-over', event)
}

function onDrop(event: DragEvent) {
  isDragOver.value = false
  emit('node-drop', event)
}

function onDragEnd() {
  isDragOver.value = false
}
</script>
