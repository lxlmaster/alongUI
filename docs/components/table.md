# Table 表格

Table 用于结构化展示数据，覆盖中后台最常见的列表、状态和空态场景。

## 基础用法

```vue
<template>
  <al-table :data="rows">
    <al-table-column prop="name" label="姓名" />
    <al-table-column prop="role" label="角色" />
    <al-table-column prop="status" label="状态" />
  </al-table>
</template>
```

## 常见状态

```vue
<template>
  <al-table
    :data="rows"
    stripe
    border
    loading
    empty-text="暂无成员"
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `any[]` | `[]` | 表格数据源 |
| stripe | `boolean` | `false` | 是否显示斑马纹 |
| border | `boolean` | `false` | 是否显示边框 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 表格尺寸 |
| maxHeight | `string \| number` | `undefined` | 表格最大高度 |
| loading | `boolean` | `false` | 是否显示加载态 |
| highlightCurrentRow | `boolean` | `false` | 是否高亮当前行 |
| emptyText | `string` | `'暂无数据'` | 空状态文案 |
| rowKey | `string` | `undefined` | 行唯一键 |

## 最小示例

```vue
<script setup>
const rows = [
  { name: 'Ava', role: 'Design', status: '在线' },
  { name: 'Liam', role: 'Engineering', status: '离线' }
]
</script>

<template>
  <al-table :data="rows" border>
    <al-table-column prop="name" label="姓名" />
    <al-table-column prop="role" label="角色" />
    <al-table-column prop="status" label="状态" />
  </al-table>
</template>
```
