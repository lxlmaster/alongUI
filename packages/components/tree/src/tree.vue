<template>
  <div class="al-tree" role="tree">
    <TreeNode
      v-for="(nodeState, index) in flatTree"
      :key="nodeState.node.value + '-' + index"
      :node-state="nodeState"
      :show-checkbox="showCheckbox"
      :draggable="draggable"
      @toggle="handleToggle(nodeState)"
      @check="handleCheck(nodeState)"
      @node-drag-start="handleDragStart($event, nodeState)"
      @node-drag-over="handleDragOver($event, nodeState)"
      @node-drop="handleDrop($event, nodeState)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TreeNode from './tree-node.vue'
import type { TreeNode as TreeNodeType, TreeNodeState } from './tree'
import { treeProps } from './tree'

defineOptions({
  name: 'AlTree'
})

const props = defineProps(treeProps)
const emit = defineEmits<{
  'node-click': [node: TreeNodeType]
  'node-expand': [node: TreeNodeType]
  'node-collapse': [node: TreeNodeType]
  'check-change': [node: TreeNodeType, checked: boolean]
  'node-drag-start': [node: TreeNodeType, evt: DragEvent]
  'node-drag-over': [node: TreeNodeType, evt: DragEvent]
  'node-drop': [node: TreeNodeType, evt: DragEvent]
}>()

const checkedSet = ref<Set<string | number>>(new Set())

function buildTreeStates(
  nodes: TreeNodeType[],
  level: number = 0
): TreeNodeState[] {
  const result: TreeNodeState[] = []

  nodes.forEach((node) => {
    const hasChildren = node.children && node.children.length > 0
    const nodeState: TreeNodeState = {
      node,
      expanded: props.defaultExpandAll || false,
      checked: checkedSet.value.has(node.value),
      indeterminate: false,
      level
    }
    result.push(nodeState)

    if (hasChildren && nodeState.expanded) {
      result.push(...buildTreeStates(node.children!, level + 1))
    }
  })
  return result
}

const flatTree = computed(() => {
  return buildTreeStates(props.data)
})

function handleToggle(nodeState: TreeNodeState) {
  nodeState.expanded = !nodeState.expanded
  if (nodeState.expanded) {
    emit('node-expand', nodeState.node)
  } else {
    emit('node-collapse', nodeState.node)
  }
}

function updateChildrenCheck(node: TreeNodeType, checked: boolean) {
  if (node.children) {
    node.children.forEach((child) => {
      if (checked) {
        checkedSet.value.add(child.value)
      } else {
        checkedSet.value.delete(child.value)
      }
      updateChildrenCheck(child, checked)
    })
  }
}

function updateParentCheck(nodes: TreeNodeType[]) {
  for (const node of nodes) {
    if (!node.children) continue
    const allChecked = node.children.every(c => checkedSet.value.has(c.value))
    const someChecked = node.children.some(c => checkedSet.value.has(c.value))
    if (allChecked) {
      checkedSet.value.add(node.value)
    } else if (!someChecked) {
      checkedSet.value.delete(node.value)
    }
    // if someChecked but not all, parent stays unchecked (indeterminate)
    updateParentCheck(node.children)
  }
}

function handleCheck(nodeState: TreeNodeState) {
  const checked = !checkedSet.value.has(nodeState.node.value)
  if (checked) {
    checkedSet.value.add(nodeState.node.value)
  } else {
    checkedSet.value.delete(nodeState.node.value)
  }
  // Cascade to children
  if (nodeState.node.children) {
    updateChildrenCheck(nodeState.node, checked)
  }
  // Update parents
  updateParentCheck(props.data)
  emit('check-change', nodeState.node, checked)
}

// Drag & drop
const dragNode = ref<TreeNodeType | null>(null)

function handleDragStart(event: DragEvent, nodeState: TreeNodeState) {
  if (!props.draggable) return
  dragNode.value = nodeState.node
  emit('node-drag-start', nodeState.node, event)
}

function handleDragOver(event: DragEvent, nodeState: TreeNodeState) {
  if (!props.draggable) return
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  emit('node-drag-over', nodeState.node, event)
}

function handleDrop(event: DragEvent, nodeState: TreeNodeState) {
  if (!props.draggable) return
  event.preventDefault()
  emit('node-drop', nodeState.node, event)
}
</script>
