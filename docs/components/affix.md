# Affix 固钉

Affix 将元素固定在视口指定位置，常用于页面侧边栏或操作栏的吸顶固定。

## 基础用法

```vue
<template>
  <al-affix :offset="80">
    <al-button type="primary">固定在顶部 80px</al-button>
  </al-affix>
</template>
```

## 固定底部

```vue
<template>
  <al-affix :offset="20" position="bottom">
    <al-button>固定在底部 20px</al-button>
  </al-affix>
</template>
```

## Affix Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| offset | `number` | `0` | 距离视口边缘的偏移量（px） |
| position | `'top' \| 'bottom'` | `'top'` | 固定在顶部或底部 |
| target | `string \| HTMLElement` | `undefined` | 指定容器选择器，仅在容器内固定 |
| zIndex | `number` | `100` | 固定时的层级 |

## Affix Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| change | `(fixed: boolean)` | 固定状态变化时触发 |

## 设计说明

- 固定时通过 `position: fixed` 实现，不改变原有 DOM 结构。
- 内部监听 `scroll` 事件以计算固定状态，滚动容器默认使用 `window`。
- 提供 `target` 容器约束时，固定范围限定在该容器内避免溢出。
