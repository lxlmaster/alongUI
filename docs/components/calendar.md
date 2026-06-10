# Calendar 日历

Calendar 用于月视图日期浏览，适合排期、值班和事件概览场景。

## 基础用法

```vue
<template>
  <al-calendar v-model="date" />
</template>
```

## 常见状态

```vue
<template>
  <al-calendar v-model="date">
    <template #date-cell="{ data }">
      <div>{{ data.day }}</div>
    </template>
  </al-calendar>
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `Date \| string` | `new Date()` | 当前日期 |
| range | `[Date, Date]` | `undefined` | 展示日期区间 |
| firstDayOfWeek | `number` | `1` | 一周起始日 |

## 最小示例

```vue
<script setup>
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <al-calendar v-model="date" />
</template>
```
