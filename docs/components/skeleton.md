# Skeleton 骨架屏

Skeleton 用于数据加载前的占位反馈，让页面结构在首屏阶段保持稳定。

## 基础用法

```vue
<template>
  <al-skeleton :rows="3" />
</template>
```

## 常见状态

```vue
<template>
  <al-skeleton animated :rows="4" />
  <al-skeleton avatar :rows="2" />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | `boolean` | `true` | 是否展示骨架屏 |
| animated | `boolean` | `false` | 是否启用闪动效果 |
| rows | `number` | `3` | 文本占位行数 |
| avatar | `boolean` | `false` | 是否显示头像占位 |
| throttle | `number` | `0` | 最小展示时长 |

## 最小示例

```vue
<template>
  <al-skeleton animated :rows="3" />
</template>
```
