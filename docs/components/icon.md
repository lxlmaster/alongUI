# Icon 图标

Icon 用于统一图标尺寸、颜色和行内对齐方式。

## 基础用法

```vue
<template>
  <al-icon :size="20" color="#0071e3">
    <SearchIcon />
  </al-icon>
</template>
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | `number \| string` | `undefined` | 图标尺寸，数字自动补 `px` |
| color | `string` | `undefined` | 图标颜色 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | SVG 或图标组件 |

## 与 Element Plus 差异

- 当前阶段仅提供图标容器，不内置完整图标集。
- 后续图标集将从高频中后台操作开始补齐。

