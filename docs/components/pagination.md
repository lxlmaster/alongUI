# Pagination 分页

Pagination 用于长列表分段浏览，适合与 Table、Card List 等数据容器搭配使用。

## 基础用法

```vue
<template>
  <al-pagination :total="120" :current="1" :page-size="10" />
</template>
```

## 常见状态

```vue
<template>
  <al-pagination
    :total="240"
    :current="2"
    :page-size="20"
    background
    small
    disabled
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| total | `number` | `0` | 总条数 |
| current | `number` | `1` | 当前页码 |
| pageSize | `number` | `10` | 每页条数 |
| pageSizes | `number[]` | `[10, 20, 30, 50]` | 可选分页尺寸 |
| layout | `string` | `'prev, pager, next'` | 布局配置 |
| disabled | `boolean` | `false` | 是否禁用 |
| small | `boolean` | `false` | 是否使用紧凑尺寸 |
| background | `boolean` | `false` | 是否显示背景块 |

## 最小示例

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <al-pagination
    v-model:current="current"
    :total="96"
    :page-size="12"
    background
  />
</template>
```
