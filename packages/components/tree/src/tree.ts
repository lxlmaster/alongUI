import type { ExtractPropTypes, PropType } from 'vue'

export interface TreeNode {
  label: string
  value: string | number
  children?: TreeNode[]
  disabled?: boolean
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeNode[]>,
    default: () => []
  },
  showCheckbox: Boolean,
  defaultExpandAll: Boolean,
  draggable: Boolean
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface TreeNodeState {
  node: TreeNode
  expanded: boolean
  checked: boolean
  indeterminate: boolean
  level: number
}
