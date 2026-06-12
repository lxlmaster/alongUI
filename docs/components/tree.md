# Tree 树形控件

Tree 用于展示层级数据，适合组织架构、目录和权限等递归结构。

## 基础用法

```vue
<template>
  <al-tree :data="nodes" node-key="id" />
</template>
```

## 常见状态

```vue
<template>
  <al-tree
    :data="nodes"
    node-key="id"
    show-checkbox
    default-expand-all
    draggable
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `TreeNode[]` | `[]` | 树节点数据 |
| nodeKey | `string` | `'id'` | 节点唯一键 |
| labelKey | `string` | `'label'` | 节点标题字段 |
| childrenKey | `string` | `'children'` | 子节点字段 |
| showCheckbox | `boolean` | `false` | 是否显示复选框 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开全部 |
| draggable | `boolean` | `false` | 是否允许拖拽排序 |
| disabled | `boolean` | `false` | 是否禁用交互 |

## 最小示例

```vue
<script setup>
const nodes = [
  {
    id: 1,
    label: '产品团队',
    children: [{ id: 11, label: '设计系统' }, { id: 12, label: '组件库' }]
  }
]
</script>

<template>
  <al-tree :data="nodes" node-key="id" show-checkbox />
</template>
```
